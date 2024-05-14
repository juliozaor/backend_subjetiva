import { Pregunta } from "../Implementacion/dto/pregunta";
import Preguntas from 'App/Infraestructura/Datos/Entidad/Pregunta';

export class ValidarPortuaria {


    public async validar(preguntasDB: any) : Promise<number[]>{
        let preguntas: Pregunta[] = preguntasDB.preguntas;

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
    
    
        return faltantes
    
      }

}