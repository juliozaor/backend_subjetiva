import { RepositorioDatosPortuaria } from "App/Dominio/Repositorios/RepositorioDatosPortuaria";
import Errores from "App/Exceptions/Errores";
import TblDatosPortuarias from "App/Infraestructura/Datos/Entidad/DatosPortuarias";
import TblSociedadesPortuarias from "App/Infraestructura/Datos/Entidad/SociedadesPortuarias";
export class RepositorioDatosPortuariasDB implements RepositorioDatosPortuaria {
  async obtener(documento: string, vigencia: number ): Promise<any> {
   
    try {
        
        const preguntas = await TblSociedadesPortuarias.query().preload(
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
      await TblDatosPortuarias.updateOrCreateMany(
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
}
