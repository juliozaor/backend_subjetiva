import { RepositorioDatosPortuaria } from "App/Dominio/Repositorios/RepositorioDatosPortuaria";
import Errores from "App/Exceptions/Errores";
import TblDatosPortuarias from "App/Infraestructura/Datos/Entidad/DatosPortuarias";
import TblSociedadesPortuarias from "App/Infraestructura/Datos/Entidad/SociedadesPortuarias";
import { ValidarPortuaria } from "../../Util/ValidarPortuaria";
import { Pregunta } from "../dto/pregunta";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
import TblDatosIdentificaciones from "App/Infraestructura/Datos/Entidad/DatosIdentificaciones";
import TblDatosReportes from "App/Infraestructura/Datos/Entidad/DatosReportes";
import TblDatosIngresos from "App/Infraestructura/Datos/Entidad/DatosIngresos";
import TblDatosDigtamen from "App/Infraestructura/Datos/Entidad/DatosDigtamen";
import TblIdentificacionVigilados from "App/Infraestructura/Datos/Entidad/IdentificacionVigilados";
import TblReporteEntidadesTerritoriales from "App/Infraestructura/Datos/Entidad/ReporteEntidadesTerritoriales";
import TblIngresosBrutosEntidadesTerritoriales from "App/Infraestructura/Datos/Entidad/IngresosBrutosEntidadesTerritoriales";
import TblDigtamenRevisorFiscals from "App/Infraestructura/Datos/Entidad/DigtamenRevisorFiscals";
export class RepositorioDatosAerodromosDB implements RepositorioDatosPortuaria {
  private estados = new ServicioEstados()
  private validarPortuaria = new ValidarPortuaria();
  async obtener(documento: string, vigencia: number): Promise<any> {
    const editable = await this.estados.consultarEnviado(documento,vigencia,7)
    this.estados.Log(documento,1002,vigencia,7)
    try {
      const consultarDatos = async (modelo) => {
          const datosDB = await modelo.query().preload("datos", (sqlDatos) => {
              sqlDatos.where("vigencia", vigencia);
              sqlDatos.where("vigiladoId", documento);
          });
  
          return datosDB.map(pregunta => ({
              preguntaId: pregunta.id,
              nombre: pregunta.nombre,
              valor: pregunta.datos[0]?.valor ?? "",
              nombreAlmacenado: pregunta.datos[0]?.nombreAlmacenado ?? "",
              nombreOriginalArchivo: pregunta.datos[0]?.nombreOriginalArchivo ?? "",
              ruta: pregunta.datos[0]?.ruta ?? "",
          }));
      };
  
      const identificacion = await consultarDatos(TblIdentificacionVigilados);
      const reporte = await consultarDatos(TblReporteEntidadesTerritoriales);
     const ingresos = await consultarDatos(TblIngresosBrutosEntidadesTerritoriales);
       const digtamen = await consultarDatos(TblDigtamenRevisorFiscals);
  
      return {
          identificacion,
          reporte,
          ingresos,
          digtamen,
          editable
      };
  } catch (error) {
      console.log(error);
      throw new Errores(`Se presentó un problema al consultar el formulario`, 400);
  }
  
  }

  async guardar(datos: any, documento: string, vigencia: number): Promise<any> {
    const { identificacion, reporte, ingresos, digtamen } = datos;

    const guardarDatos = async (preguntas: any[], modelo: any) => {
        if (preguntas) {
            const preguntasGuardadas = preguntas.map(pregunta => ({
                ...pregunta,
                vigiladoId: documento,
                vigencia: vigencia,
            }));
            try {
                await modelo.updateOrCreateMany(
                    ["preguntaId", "vigiladoId", "vigencia"],
                    preguntasGuardadas
                );
                this.estados.Log(documento, 1003, vigencia, 7);
                return true;
            } catch (error) {
                throw new Errores(
                    `Se presentó un problema al guardar el formulario`,
                    400
                );
            }
        }
    };

    await Promise.all([
        guardarDatos(identificacion, TblDatosIdentificaciones),
        guardarDatos(reporte, TblDatosReportes),
        guardarDatos(ingresos, TblDatosIngresos),
        guardarDatos(digtamen, TblDatosDigtamen)
    ]);

    return true;
}


  async enviar(documento: string, vigencia: number): Promise<any> {
    
    const preguntas: any = await this.obtener(documento, vigencia);
    
    const faltantes = await this.validarPortuaria.validar(preguntas);
    let aprobado = true
    if (faltantes.length > 0) {
      aprobado = false
    }
    if (aprobado) {
      this.estados.Log(documento,1004,vigencia,7)      
    }
   
    return {
      aprobado,
      faltantes,
    };
  }

}
