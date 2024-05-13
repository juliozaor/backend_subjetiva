import { Pregunta } from "../Implementacion/dto/pregunta";

export class ValidarTransporte {


    public async validar(preguntas: Pregunta[]) : Promise<number[]>{

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
            if (id == 5 || id == 6 || id == 20 || id == 21 || id == 26 || id == 27) {
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