import { PeticionActualizarUsuario } from "App/Dominio/Dto/Usuarios/PeticionActualizacionUsuario";
import { RepositorioUsuario } from "App/Dominio/Repositorios/RepositorioUsuario";
import { Usuario } from "../Entidades/Usuario";
import { Exception } from "@adonisjs/core/build/standalone";
import { ReportaMunicipios } from "../Entidades/ReportaMunicipios";

export class ServicioUsuario {
    constructor(
        private repositorioUsuarios: RepositorioUsuario,
    ) { }

    async actualizarInformacionUsuario(informacion: PeticionActualizarUsuario, identificacion: string): Promise<Usuario> {
        let usuario = await this.obtenerUsuario(identificacion)
        usuario = this.actualizarInformacion(usuario, informacion)
        await this.repositorioUsuarios.actualizarUsuario(usuario.id, usuario)
        return usuario
    }

    async obtenerMunicipiosUsuario(idVigilado: string):Promise<ReportaMunicipios[]>{
        return this.repositorioUsuarios.obtenerMunicipiosDeUsuario(idVigilado)
    }

    public async obtenerUsuario(identificacion: string): Promise<Usuario> {
        let usuario = await this.repositorioUsuarios.obtenerUsuarioPorUsuario(identificacion)
        if (!usuario) throw new Exception(`No se encontró el usuario ${identificacion}`, 404);

        return usuario
    }

    async obtenerUsuarioPorRol(rol: string): Promise<Usuario[]> {
        return this.repositorioUsuarios.obtenerUsuarioPorRol(rol);
      }

    private actualizarInformacion(
        usuario: Usuario,
        informacion: PeticionActualizarUsuario): Usuario {
        for (const nuevoDato in informacion) {
            usuario[nuevoDato] = informacion[nuevoDato]
        }
        return usuario
    }

    public async caracterizacion(idUsuario: string, idEncuesta?: number, ): Promise<any> {
        const usuario = await this.obtenerUsuario(idUsuario)

        return this.repositorioUsuarios.caracterizacion(usuario.id, usuario.idRol, idEncuesta)
    }

   

}