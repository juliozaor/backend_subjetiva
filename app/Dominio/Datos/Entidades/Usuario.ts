import { DateTime } from 'luxon'
export class Usuario{
  id: string;
  usuario: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: DateTime;
  cargo: string;
  correo: string;
  telefono: string;
  estado: boolean;
  clave: string;
  claveTemporal: boolean;
  idRol: string;
  departamentoId?: number;
  nombreDepartamento?: string;
  municipioId?: number;
  nombreCiudad?: string;  
  esDepartamental?: number;
  abrirModal?:boolean;
  reportaOtroMunicipio?:boolean;
}
