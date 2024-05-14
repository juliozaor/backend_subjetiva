import { RepositorioDatosTransito } from "App/Dominio/Repositorios/RepositorioDatosTransito";
import Errores from "App/Exceptions/Errores";
import TblDatosTransitos from "App/Infraestructura/Datos/Entidad/DatosTransitos";
import { ValidarTransito } from "../../Util/ValidarTransito";
import { Pregunta } from "../dto/pregunta";
import TblOrganismosTransitos from "App/Infraestructura/Datos/Entidad/OrganismosTransito";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
export class RepositorioDatosTransitoDB implements RepositorioDatosTransito {
  private estados = new ServicioEstados()
  private validarTransito = new ValidarTransito();
  async obtener(documento: string, vigencia: number): Promise<any> {
    try {
      const preguntasDB = await TblOrganismosTransitos.query().preload(
        "datos",
        (sqlDatos) => {
          sqlDatos.where("vigencia", vigencia);
          sqlDatos.where("vigiladoId", documento);
        }
      );

      this.estados.Log(documento,1002,vigencia,9)

      const editable = await this.estados.consultarEnviado(documento,vigencia,7)
      
      const preguntas = new Array()

      preguntasDB.forEach(pregunta => {
        preguntas.push({
          preguntaId: pregunta.id,
          nombre: pregunta.nombre,
          valor: pregunta.datos[0]?.valor ?? "",
          nombreAlmacenado: pregunta.datos[0]?.nombreAlmacenado ?? "",
          nombreOriginalArchivo: pregunta.datos[0]?.nombreOriginalArchivo ?? "",
          ruta: pregunta.datos[0]?.ruta ?? "",
        })
      });

      return{
        preguntas,
        editable
      }

    } catch (error) {
      console.log(error);

      throw new Errores(
        `Se presento un problema al consultar el formulario`,
        400
      );
    }
  }

  async guardar(datos: any, documento: string, vigencia: number): Promise<any> {
    const { preguntas } = datos;
    let preguntasDB = new Array();
    if (!preguntas) {
      throw new Errores(
        `Se presento un problema al guardar el formulario`,
        400
      );
    }
    for await (const pregunta of preguntas) {
      preguntasDB.push({
        ...pregunta,
        vigiladoId: documento,
        vigencia: vigencia,
      });
    }

    try {
      await TblDatosTransitos.updateOrCreateMany(
        ["preguntaId", "vigiladoId", "vigencia"],
        preguntasDB
      );
      this.estados.Log(documento,1003,vigencia,9)
      return true;
    } catch (error) {
      throw new Errores(
        `Se presento un problema al guardar el formulario`,
        400
      );
    }
  }

  async enviar(documento: string, vigencia: number): Promise<any> {
    const preguntas: Pregunta[] = await this.obtener(documento, vigencia);
    const faltantes = await this.validarTransito.validar(preguntas);
    let aprobado = true
    if (faltantes.length >= 0) {
      aprobado = false
    }
    if (aprobado) {
      this.estados.Log(documento,1004,vigencia,9)      
    }
   
    return {
      aprobado,
      faltantes,
    };
  }
}
