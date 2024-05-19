import { EstadosServicioTercerizado } from "App/Dominio/Datos/Entidades/EstadosServicioTercerizado";
import { Pregunta } from "../Implementacion/dto/pregunta";

export class ValidarTransito {


    public async validar(preguntasDB:any) : Promise<{faltantesPreguntas,faltantesIdentificacion}>{
        let identificacionOrganismo: EstadosServicioTercerizado = preguntasDB.identificacionOrganismo;
        
        const faltantesIdentificacion: string[] = [];
        
        for (const key in identificacionOrganismo) {
            if (typeof identificacionOrganismo[key] !== 'boolean') {
                if (identificacionOrganismo[key] === undefined || identificacionOrganismo[key] === null || identificacionOrganismo[key] === '') {
                    faltantesIdentificacion.push(key); 
                }
            }
        }
        
        
        let preguntas: any = preguntasDB.preguntas;
        const faltantesPreguntas = {}
        const servicios = [
            "gruas",
            "patios",
            "tramitesTransito",
            "deteccionInfracciones",
            "procesosContravencionales",
            "procesoCobroCoactivo",
            "procesoCobroPersuasivo",
            "recaudoMultas",
            "otros"
        ]
        servicios.forEach(servicio => {
            faltantesPreguntas[servicio] = []; 
                if(identificacionOrganismo[servicio]){
                    preguntas[servicio].forEach(pregunta => {

                        const id = pregunta.preguntaId
                        if(id == 17 || id == 8){
                            if(pregunta.nombreAlmacenado == null || pregunta.nombreAlmacenado == undefined || pregunta.nombreAlmacenado == ''){
                                faltantesPreguntas[servicio].push(id)
                            }                           
            
                        }else
                        if (id == 19 && servicio == 'otros') {
                                    if(pregunta.valor == null || pregunta.valor == undefined || pregunta.valor == ''){
                                        if (!faltantesPreguntas[servicio].includes(id)) {
                                            faltantesPreguntas[servicio].push(id);
                                        }
                                    }
                            
                        }else if(id != 0){
                            if(pregunta.valor == null || pregunta.valor == undefined || pregunta.valor == '' ){
                                faltantesPreguntas[servicio].push(id)
                            }
                        }
                            
                        });
                }
                

        });

       
    
    
        return {faltantesPreguntas,faltantesIdentificacion}
    
      }

}