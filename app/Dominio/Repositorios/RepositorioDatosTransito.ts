export interface RepositorioDatosTransito {
  guardar(datos: string, documento:string, vigencia:number): Promise<any>  
}
