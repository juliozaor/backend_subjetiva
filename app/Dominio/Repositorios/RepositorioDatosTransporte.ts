export interface RepositorioDatosTransporte {
  guardar(datos: any, documento:string, vigencia:number): Promise<any>  
}
