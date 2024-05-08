import axios from "axios";
import Env from '@ioc:Adonis/Core/Env';

export class ServicioAuditoria{

  public async Auditar (datos: {}) {
      axios.post(`${Env.get('LOGS')}/auditoria`, datos).then(resp =>{
      }).catch(err =>{
        console.log("Fallo auditoria", err);
        
      })
  }

}
