export interface RepositorioDatosPortuaria {
  guardar(datos: string, documento:string, vigencia:number): Promise<any>  
}
