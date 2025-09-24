import { RepositorioDatosPortuaria } from "App/Dominio/Repositorios/RepositorioDatosPortuaria";
import Errores from "App/Exceptions/Errores";
import TblDatosPortuarias from "App/Infraestructura/Datos/Entidad/DatosPortuarias";
import TblSociedadesPortuarias from "App/Infraestructura/Datos/Entidad/SociedadesPortuarias";
import { ValidarPortuaria } from "../../Util/ValidarPortuaria";
import { Pregunta } from "../dto/pregunta";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
export class RepositorioDatosPortuariasDB implements RepositorioDatosPortuaria {
  private estados = new ServicioEstados()
  private validarPortuaria = new ValidarPortuaria();
  async obtener(documento: string, vigencia: number, editar:boolean): Promise<any> {
    try {
       let editable = true
      if(!editar){
        editable = false
      }else{
        editable = await this.estados.consultarEnviado(documento,vigencia,7)
      }


      const preguntasDB = await TblSociedadesPortuarias.query().preload(
        "datos",
        (sqlDatos) => {
          sqlDatos.where("vigencia", vigencia);
          sqlDatos.where("vigiladoId", documento);
        }
      ).orderBy('id', 'asc');

      this.estados.Log(documento,1002,vigencia,7)



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
      await TblDatosPortuarias.updateOrCreateMany(
        ["preguntaId", "vigiladoId", "vigencia"],
        preguntasDB
      );
      this.estados.Log(documento,1003,vigencia,7)
     // this.estados.estadoReporte(documento,1003,vigencia,7)
      return true;
    } catch (error) {
      throw new Errores(
        `Se presento un problema al guardar el formulario`,
        400
      );
    }
  }

  async enviar(documento: string, vigencia: number): Promise<any> {
    console.log("Enviando datos portuarias", documento, vigencia);

    const preguntas: any = await this.obtener(documento, vigencia, true);

    const faltantes = await this.validarPortuaria.validar(preguntas);
    let aprobado = true
    if (faltantes.length > 0) {
      aprobado = false
    }
    if (aprobado) {
      this.estados.Log(documento,1004,vigencia,7)
     // this.estados.estadoReporte(documento,1004,vigencia,7)
    }

    return {
      aprobado,
      faltantes,
    };
  }
}
