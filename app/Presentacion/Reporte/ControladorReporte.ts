import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioReporte } from "App/Dominio/Datos/Servicios/ServicioReporte";
import { RepositorioReportesNuevoDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioReportesNuevoDB";

export default class ControladorReporte {
    private servicio: ServicioReporte

    constructor() {
        this.servicio = new ServicioReporte(new RepositorioReportesNuevoDB());
    }

    public async listarPorFormulario({ request, response }: HttpContextContract) {
        try {
            const { documento } = await request.obtenerPayloadJWT()
            const { formularioId } = request.params();

            // Parámetros opcionales de paginación
            const paginaParam = request.input('pagina');
            const limiteParam = request.input('limite');

            const pagina = paginaParam ? parseInt(paginaParam) : undefined;
            const limite = limiteParam ? parseInt(limiteParam) : undefined;

            if (!formularioId) {
                return response.status(400).json({
                    error: 'El formularioId es requerido'
                });
            }

            const resultado = await this.servicio.listarPorFormulario(
                documento,
                parseInt(formularioId),
                pagina,
                limite
            );

            const respuesta: any = {
                success: true,
                data: resultado.reportes
            };

            // Solo incluir paginación si se usó
            if (resultado.paginacion) {
                respuesta.paginacion = resultado.paginacion;
            }

            return response.json(respuesta);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                error: 'Error al consultar reportes por formulario'
            });
        }
    }
}
