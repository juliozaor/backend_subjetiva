import { EstadosServicioTercerizado } from "App/Dominio/Datos/Entidades/EstadosServicioTercerizado";
import { Pregunta } from "../Implementacion/dto/pregunta";

export class ValidarTransito {


    public async validar(preguntasDB:any) : Promise<{}>{
        let preguntas: any[] = preguntasDB.preguntas;
        let identificacionOrganismo: EstadosServicioTercerizado = preguntasDB.identificacionOrganismo;

        const faltantesIdentificacion: string[] = [];

        for (const key in identificacionOrganismo) {
            if (typeof identificacionOrganismo[key] !== 'boolean') {
                if (identificacionOrganismo[key] === undefined || identificacionOrganismo[key] === null || identificacionOrganismo[key] === '') {
                    faltantesIdentificacion.push(key); 
                }
            }
        }
       
                
        const faltantes: number[] = []
        preguntas.forEach(pregunta => {

            const id = pregunta.preguntaId
            if(id == 8){
                if(pregunta.nombreAlmacenado == null || pregunta.nombreAlmacenado == undefined || pregunta.nombreAlmacenado == ''){
                    faltantes.push(id)
                }
                
                    const preguntaAnterior = preguntas.find(p => p.preguntaId == id-1)    
                    if(preguntaAnterior?.valor != '1') {
                        if(pregunta.valor == null || pregunta.valor == undefined || pregunta.valor == ''){
                            if (!faltantes.includes(id)) {
                                faltantes.push(id);
                            }
                        }
                    }

            }else
            if (id == 23) {
                const preguntaAnterior = preguntas.find(p => p.preguntaId == id-1)    
                    if(preguntaAnterior?.valor == '1') {
                        if(pregunta.valor == null || pregunta.valor == undefined || pregunta.valor == ''){
                            if (!faltantes.includes(id)) {
                                faltantes.push(id);
                            }
                        }
                    }
                
            }else
            if (id == 5 || id == 24 || id == 26 || id == 29 || id == 31 || id == 32 || id == 36 || id == 37) {
                if(pregunta.nombreAlmacenado == null || pregunta.nombreAlmacenado == undefined || pregunta.nombreAlmacenado == ''
                 || pregunta.valor == null || pregunta.valor == undefined || pregunta.valor == '' ){
                    faltantes.push(id)
                }
                
                
            }else{
                if(pregunta.valor == null || pregunta.valor == undefined || pregunta.valor == '' ){
                    faltantes.push(id)
                }
            }
                
            });
    
    
        return {faltantes,faltantesIdentificacion}
    
      }

}