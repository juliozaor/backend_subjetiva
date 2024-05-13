export interface RepositorioDatosTransporte {
  obtener(documento:string, vigencia:number): Promise<any>  
  guardar(datos: any, documento:string, vigencia:number): Promise<any>  
  enviar(documento:string, vigencia:number): Promise<any>  
}
