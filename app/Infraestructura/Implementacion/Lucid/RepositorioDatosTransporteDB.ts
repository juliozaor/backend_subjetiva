import Errores from "App/Exceptions/Errores";
import { ValidarTransporte } from "../../Util/ValidarTransporte";
import { Pregunta } from "../dto/pregunta";
import TblEmpresasTransportes from "App/Infraestructura/Datos/Entidad/EmpresasTransporte";
import TblDatosTransporte from "App/Infraestructura/Datos/Entidad/DatosTransportes";
import { RepositorioDatosTransporte } from "App/Dominio/Repositorios/RepositorioDatosTransporte";
export class RepositorioDatosTransporteDB implements RepositorioDatosTransporte {
  private validarTransporte = new ValidarTransporte();
  async obtener(documento: string, vigencia: number): Promise<any> {
    try {
      const preguntas = await TblEmpresasTransportes.query().preload(
        "datos",
        (sqlDatos) => {
          sqlDatos.where("vigencia", vigencia);
          sqlDatos.where("vigiladoId", documento);
        }
      );

      return preguntas.map((pregunta) => {
        return {
          preguntaId: pregunta.id,
          nombre: pregunta.nombre,
          valor: pregunta.datos[0]?.valor ?? "",
          nombreAlmacenado: pregunta.datos[0]?.nombreAlmacenado ?? "",
          nombreOriginalArchivo: pregunta.datos[0]?.nombreOriginalArchivo ?? "",
          ruta: pregunta.datos[0]?.ruta ?? "",
        };
      });
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
    const faltantes = await this.validarTransporte.validar(preguntas);
    console.log(faltantes.length);
    if (faltantes.length >= 0) {
      return {
        aprovado: false,
        faltantes,
      };
    }

    return {
      aprovado: true,
      faltantes,
    };
  }
}
