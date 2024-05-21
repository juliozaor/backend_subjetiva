

export class ValidarAerodromo {
  public async validar(
    preguntasDB: any
  ): Promise<{ faltantesIdentificacion, faltantesReporte, faltantesIngresos, faltantesDigtamen }> {
    const { identificacion, reporte, ingresos, digtamen } = preguntasDB;

    const documentosIdentificacion = [
      27, 30, 37, 42, 46, 48, 52, 55, 58, 63, 66, 69, 72, 76, 79, 82, 84,
    ];

    const faltantesIdentificacion: string[] = [];
    const faltantesReporte: string[] = [];
    const faltantesIngresos: string[] = [];
    const faltantesDigtamen: string[] = [];

    let continuarIteracion = true;

    identificacion.forEach((idnt) => {
      const id = idnt.preguntaId;

      if (!continuarIteracion) {
        return; // Salir del forEach si continuarIteracion es falso
    }

      if (id == 33) {
        const preguntaAnterior = identificacion.find(
          (p) => p.preguntaId == id - 1
        );
        if (preguntaAnterior?.valor == "1") {
          if (
            idnt.valor == null ||
            idnt.valor == undefined ||
            idnt.valor == ""
          ) {
            if (!faltantesIdentificacion.includes(id)) {
              faltantesIdentificacion.push(id);
            }
          }
        }
      } else if (id == 59) {
       
        
        if (idnt.valor == null || idnt.valor == undefined || idnt.valor == "") {
          if (!faltantesIdentificacion.includes(id)) {
            faltantesIdentificacion.push(id);
          }
        } else if (idnt.valor == "5") {
            continuarIteracion = false; // No continuar iterando si el valor es 5
            return;
        }
      } else if (documentosIdentificacion.includes(id)) {
        if (
          idnt.nombreAlmacenado == null ||
          idnt.nombreAlmacenado == undefined ||
          idnt.nombreAlmacenado == ""
        ) {
          faltantesIdentificacion.push(id);
        }
      } else {
        if (idnt.valor == null || idnt.valor == undefined || idnt.valor == "") {
          faltantesIdentificacion.push(id);
        }
      }
    });


    const documentosReporte = [5, 10, 13, 16, 19];

    reporte.forEach((rep) => {
      const id = rep.preguntaId;

      if (documentosReporte.includes(id)) {
        if (
          rep.nombreAlmacenado == null ||
          rep.nombreAlmacenado == undefined ||
          rep.nombreAlmacenado == ""
        ) {
          faltantesReporte.push(id);
        }
      } else {
        if (rep.valor == null || rep.valor == undefined || rep.valor == "") {
          faltantesReporte.push(id);
        }
      }
    });

    ingresos.forEach((ing) => {
      if (ing.valor == null || ing.valor == undefined || ing.valor == "") {
        faltantesIngresos.push(ing.preguntaId);
      }
    });

    digtamen.forEach((dig) => {
      const id = dig.preguntaId;

      if (id == 5) {
        if (
          dig.nombreAlmacenado == null ||
          dig.nombreAlmacenado == undefined ||
          dig.nombreAlmacenado == ""
        ) {
          faltantesDigtamen.push(id);
        }
      } else {
        if (dig.valor == null || dig.valor == undefined || dig.valor == "") {
          faltantesDigtamen.push(id);
        }
      }
    });

    return { faltantesIdentificacion, faltantesReporte, faltantesIngresos, faltantesDigtamen };
  }
}
