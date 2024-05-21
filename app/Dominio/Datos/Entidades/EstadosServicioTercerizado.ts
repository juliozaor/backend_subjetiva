export class EstadosServicioTercerizado {
  id?: number;
  razonSocial: string;
  tipoNit: number | null;
  nit: number | null;
  digitoVerificacion: number | null;
  tipoOrganizacion: number | null;
  apoyaTerceros: number | null;
  procesoAdjudicacion: number | null;
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
