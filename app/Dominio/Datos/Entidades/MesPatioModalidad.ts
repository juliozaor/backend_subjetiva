import { TipoPatioModalidad } from "App/Dominio/TipoPatioModalidad";

export class MesPatioModalidad {
    public id?: number;
    public tipo: TipoPatioModalidad;
    public mes: number; 
    public mensaje: string;
    public estado: boolean;
    
    constructor({
      id,
      tipo,
      mes,
      mensaje,
      estado = true,
    }:{
      id?: number,
      tipo: TipoPatioModalidad,
      mes: number,
      mensaje: string,
      estado: boolean,
    }){
      this.id = id
      this.tipo = tipo
      this.mes = mes
      this.mensaje = mensaje
      this.estado = estado
    }
  
    actualizar({
      tipo,
      mes,
      mensaje,
      estado = true
    }:{
      tipo?: TipoPatioModalidad,
      mes?: number,
      mensaje?: string,
      estado?: boolean
    }){
      this.tipo = tipo ?? this.tipo
      this.mes = mes ?? this.mes
      this.mensaje = mensaje ?? this.mensaje
      this.estado = estado ?? this.estado
    }
  }
  
  
  