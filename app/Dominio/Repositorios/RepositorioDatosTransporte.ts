export interface RepositorioDatosTransporte {
  guardar(datos: string, documento:string, vigencia:number): Promise<any>  
}
