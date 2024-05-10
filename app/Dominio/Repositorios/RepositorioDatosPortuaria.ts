export interface RepositorioDatosPortuaria {
  obtener(documento:string, vigencia:number): Promise<any>  
  guardar(datos: any, documento:string, vigencia:number): Promise<any>  
}
