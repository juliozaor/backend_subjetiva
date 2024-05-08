import { DateTime } from 'luxon'
export class ReportaMunicipios {
  id?: number
  departamento: number
  nombreDepartamento?: string
  municipio: number
  nombreMunicipio?: string
  usuario: string
  convenio?: string
  ruta?: string
  documento?: string
  nombreOriginal?: string
  estado?: boolean
}
