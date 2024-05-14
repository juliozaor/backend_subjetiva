export class EstadosServicioTercerizado {
  id?: number;
  razonSocial: string;
  tipoNit: number;
  nit: number;
  digitoVerificacion: number;
  tipoOrganizacion: number;
  apoyaTerceros: number;
  procesoAdjudicacion: number;
  gruas: boolean;
  patios: boolean;
  tramitesTransito: boolean;
  deteccionInfracciones: boolean;
  procesosContravencionales: boolean;
  procesoCobroCoactivo: boolean;
  procesoCobroPersuasivo: boolean;
  recaudoMultas: boolean;
  otros: boolean;    
  vigiladoId: string;
  vigencia: number; 
}
