export interface RepositorioDatosTransito {
  guardar(datos: any, documento:string, vigencia:number): Promise<any>  
}
