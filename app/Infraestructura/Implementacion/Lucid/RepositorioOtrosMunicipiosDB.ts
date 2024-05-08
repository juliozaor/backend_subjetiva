import { Exception } from "@adonisjs/core/build/standalone";
import { ReportaMunicipios } from "App/Dominio/Datos/Entidades/ReportaMunicipios";
import { RepositorioOtrosMunicipios } from "App/Dominio/Repositorios/RepositorioOtrosMunicipios";
import { TblReportaMunicipios } from "App/Infraestructura/Datos/Entidad/ReportaMunicipios";
import TblUsuarios from "App/Infraestructura/Datos/Entidad/Usuario";

export class RepositorioOtrosMunicipiosDB implements RepositorioOtrosMunicipios {

    public async obtener(idUsuario: string): Promise<any> {
        const municipios = await TblReportaMunicipios.query().where('rmu_usuario', idUsuario);

        return municipios
    }

    public async crear(idUsuario: string, param: any): Promise<any> {
        const { reportaOtrosMunicipios, municipios } = JSON.parse(param);

        const usuarioDb = await TblUsuarios.query().where('usn_usuario', idUsuario).first();
        if (!usuarioDb) throw new Exception('No se encontro el usuario', 400);

        usuarioDb.actualizarRespuesta(reportaOtrosMunicipios);
        usuarioDb.save();

        const municipiosUsuario = new TblReportaMunicipios()
        municipiosUsuario.establecerMunicipios({
            departamento: usuarioDb.departamentoId!,
            municipio: usuarioDb.municipioId!,
            usuario: usuarioDb.usuario
        })
        municipiosUsuario.save();
        if (reportaOtrosMunicipios) {
            for await (const municipio of municipios) {
                
          //  municipios.forEach(municipio => {
                console.log(municipio);

                const otrosMunicipios = new TblReportaMunicipios()
                otrosMunicipios.establecerMunicipios({
                    departamento: municipio.idDepartamento,
                    municipio: municipio.idMunicipio,
                    usuario: usuarioDb.usuario,
                    convenio: municipio.numeroConvenio,
                    ruta: municipio.convenioPDFRuta,
                    documento: municipio.convenioPDFDocumento,
                    nombreOriginal: municipio.convenioPDFOriginal
                })
                otrosMunicipios.save();
           // });
            }

        }

        return await this.obtener(idUsuario);


    }


}