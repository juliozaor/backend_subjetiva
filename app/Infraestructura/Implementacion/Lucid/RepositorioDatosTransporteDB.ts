import Errores from "App/Exceptions/Errores";
import { ValidarTransporte } from "../../Util/ValidarTransporte";
import { Pregunta } from "../dto/pregunta";
import TblEmpresasTransportes from "App/Infraestructura/Datos/Entidad/EmpresasTransporte";
import TblDatosTransporte from "App/Infraestructura/Datos/Entidad/DatosTransportes";
import { RepositorioDatosTransporte } from "App/Dominio/Repositorios/RepositorioDatosTransporte";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
export class RepositorioDatosTransporteDB implements RepositorioDatosTransporte {
  private estados = new ServicioEstados()
  private validarTransporte = new ValidarTransporte();
  async obtener(documento: string, vigencia: number, editar:boolean): Promise<any> {
    try {
      let editable = true
      if(!editar){
        editable = false
      }else{
       editable = await this.estados.consultarEnviado(documento,vigencia,8)
      }

      const preguntasDB = await TblEmpresasTransportes.query().preload(
        "datos",
        (sqlDatos) => {
          sqlDatos.where("vigencia", vigencia);
          sqlDatos.where("vigiladoId", documento);
        }
      ).orderBy('id', 'asc');

      this.estados.Log(documento,1002,vigencia,8)
      //this.estados.estadoReporte(documento,1002,vigencia,8)

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
      await TblDatosTransporte.updateOrCreateMany(
        ["preguntaId", "vigiladoId", "vigencia"],
        preguntasDB
      );
      this.estados.Log(documento,1003,vigencia,8)
      //this.estados.estadoReporte(documento,1003,vigencia,8)
      return true;
    } catch (error) {
      throw new Errores(
        `Se presento un problema al guardar el formulario`,
        400
      );
    }
  }

  async enviar(documento: string, vigencia: number): Promise<any> {
    const preguntas: any = await this.obtener(documento, vigencia, true);
    const faltantes = await this.validarTransporte.validar(preguntas);
    let aprobado = true
    if (faltantes.length > 0) {
      aprobado = false
    }
    if (aprobado) {
      this.estados.Log(documento,1004,vigencia,8)
      //this.estados.estadoReporte(documento,1004,vigencia,8)
    }

    return {
      aprobado,
      faltantes,
    };
  }
}
