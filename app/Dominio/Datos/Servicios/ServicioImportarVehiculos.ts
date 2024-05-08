import Excel from 'exceljs';
import fs from 'fs';
import * as path from 'path';
import csv from 'csv-stringify'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { VehiculoPatio } from '../Entidades/VehiculoPatio';
import { TblVehiculosPatios } from 'App/Infraestructura/Datos/Entidad/vehiculosPatios';
import { TblVehiculosModalidades } from 'App/Infraestructura/Datos/Entidad/vehiculosModalidades';
import { VehiculoModalidad } from '../Entidades/VehiculoModalidad';
import { Resultado } from 'App/Dominio/Resultado';
import { ErrorFormatoImportarExcel } from './Dtos/ErrorFormatoImportarExcel';
import { TblPatios } from 'App/Infraestructura/Datos/Entidad/Patios';
import TblModalidades from 'App/Infraestructura/Datos/Entidad/modalidad';
import { RespuestaImportacionExcel } from './Dtos/RespuestaImportacionExcel';

export class ServicioImportarVehiculos {
  async importDataXLSX(
    tipo: number, 
    archivo: MultipartFileContract, 
    idVigilado: string, 
    vigencia: number, 
    mes: number
  ): Promise<Resultado<RespuestaImportacionExcel>> {
    let rutaArchivo;
    try {
      const fname = `${new Date().getTime()}.${archivo.extname}`;
      const dir = 'uploads/';

      // Mueve el archivo cargado a la carpeta 'uploads' en la raíz del proyecto
      await archivo.move(path.resolve(dir), {
        name: fname
      });

      if (!archivo.isValid) {
        console.log('Error al mover el archivo');
        /* return ['Error moving files', 500]; */
        return new Resultado({
          estado: 500,
          mensaje: 'Error al mover el archivo',
          exitoso: false
        });
      }

      const filePath = path.resolve(`${dir}${fname}`);
      rutaArchivo = filePath;
      // Resto de la lógica del servicio...
      let resultado = await this.importClassification(filePath, tipo, idVigilado, vigencia, mes)
      return resultado
    } catch (error) {
      console.error(error);
      return new Resultado({
        estado: 500,
        mensaje: 'Error del servidor',
        exitoso: false
      });
    } finally {
      // Eliminar el archivo, independientemente del resultado
      if (rutaArchivo) {
        try {
          await fs.promises.unlink(rutaArchivo);
          console.log('Archivo eliminado exitosamente.');
        } catch (unlinkError) {
          console.error('Error al eliminar el archivo:', unlinkError);
        }
      }
    }
  }

  async importClassification(filelocation, tipo, idVigilado, vigencia, mes): Promise<Resultado<RespuestaImportacionExcel>> {
    let resultado: Resultado<ErrorFormatoImportarExcel[]>
    let libro = new Excel.Workbook()
    libro = await libro.xlsx.readFile(filelocation)
    let hoja = libro.getWorksheet('Hoja1')! // get sheet name
    let colComment = hoja.getColumn('A') //column name
    if (tipo == 1) {
      return this.importPatios(colComment, idVigilado, hoja, vigencia, mes);
    }
    if (tipo == 2) {
      return this.importModalidades(colComment, idVigilado, hoja, vigencia, mes);
    }
    return new Resultado({
      estado: 500,
      exitoso: false
    })
  }

  async importPatios(
    colComment: Excel.Column,
    idVigilado: string,
    hoja: Excel.Worksheet,
    vigencia, mes): Promise<Resultado<RespuestaImportacionExcel>> {
    const errores = await this.validarPatios(hoja, idVigilado)
    if (errores.length > 0) {
      const archivoB64 = await this.generarCsvErrores(errores)
      return new Resultado({
        exitoso: false,
        estado: 422,
        datos: { errores, archivo: archivoB64 },
        mensaje: 'Hay errores de validación.'
      })
    }
    await TblVehiculosPatios.query().where({ 'veh_vigilado': idVigilado, 'veh_vigencia': vigencia, 'veh_mes': mes }).delete();
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const patio = hoja.getCell('A' + rowNumber).value!.toString()
        const placa = hoja.getCell('B' + rowNumber).value!.toString()
        const ingreso = hoja.getCell('C' + rowNumber).value
        if (placa !== '' && patio !== '' && ingreso !== '') {
          //custom field name in database to variable
          const inputPlaca: VehiculoPatio = {
            patioId: patio,
            placa: placa.toString().toLocaleLowerCase(),
            ingreso: new Date(ingreso!.toString()),
            vigilado: idVigilado,
            vigencia, mes
          }
          try {
            const vehiculo = new TblVehiculosPatios()
            vehiculo.estableceVehiculoConId(inputPlaca)
            await vehiculo.save()
            console.log(vehiculo.id);
          } catch (error) {
            console.log('la placa ya existe');
          }
        }
      }
    })
    return new Resultado({
      exitoso: true,
      estado: 200
    })
  }

  importModalidades = async (
    colComment: Excel.Column,
    idVigilado: string,
    hoja: Excel.Worksheet,
    vigencia: number,
    mes: number
  ): Promise<Resultado<RespuestaImportacionExcel>> => {
    const errores = await this.validarModalidades(hoja)
    if(errores.length > 0){
      const archivoB64 = await this.generarCsvErrores(errores)
      return new Resultado({
        exitoso: false,
        estado: 422,
        datos: {errores, archivo: archivoB64},
        mensaje: 'Hay errores de validación.'
      })
    }
    await TblVehiculosModalidades.query().where({ 'vep_vigilado': idVigilado, 'vep_vigencia': vigencia, 'vep_mes': mes }).delete();
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const nit = hoja.getCell('A' + rowNumber).value?.valueOf()
        const modalidad = hoja.getCell('B' + rowNumber).value?.valueOf()
        const placa = hoja.getCell('C' + rowNumber).value?.valueOf()
        if (placa !== '' && nit !== '' && modalidad !== '') {

          //custom field name in database to variable
          const inputPlaca: VehiculoModalidad = {
            nit: nit!.toString(),
            placa: placa!.toString().toLocaleLowerCase(),
            modalidadId: modalidad!.toString(),
            vigilado: idVigilado,
            vigencia,
            mes
          }
          try {
            const vehiculo = new TblVehiculosModalidades()
            vehiculo.estableceVehiculoConId(inputPlaca)
            await vehiculo.save()
            console.log(vehiculo.id);
          } catch (error) {
            console.log(`la placa ${placa} ya existe`);
          }
        }
      }
    })
    return new Resultado({
      exitoso: true,
      estado: 200
    })
  }

  async validarPatios(hoja: Excel.Worksheet, idVigilado: string): Promise<ErrorFormatoImportarExcel[]> {
    const patios = await TblPatios.query().where('pat_usuario_id', idVigilado)
    const idPatios = patios.map(patio => patio.id!)
    let errores: ErrorFormatoImportarExcel[] = []
    hoja.eachRow(fila => {
      if (fila.number > 1) {
        const idPatio = fila.getCell('A').value?.valueOf()
        const numeroPlaca = fila.getCell('B').value?.valueOf()
        const fechaIngreso = fila.getCell('C').value?.valueOf()
        //Validar existencia
        if (!idPatio) {
          errores.push({
            columna: 'A',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: null
          })
        } else {
          if (typeof idPatio === 'number' || typeof idPatio === 'string') {
            const existePatio = idPatios.includes(Number(idPatio))
            if (!existePatio) {
              errores.push({
                columna: 'A',
                fila: fila.number.toString(),
                error: `No existe el patio con id: ${idPatio}`,
                valor: idPatio
              })
            }
          }
        }
        if (!numeroPlaca) {
          errores.push({
            columna: 'B',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: null
          })
        }

        if (!fechaIngreso) {
          errores.push({
            columna: 'C',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: null
          })
        } else {
          if (typeof fechaIngreso === 'string') {
            const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/
            if (!regex.test(fechaIngreso)) {
              errores.push({
                columna: 'C',
                fila: fila.number.toString(),
                error: 'No es una fecha válida.',
                valor: fechaIngreso
              })
            }
          }
        }
      }
    })
    return errores
  }

  async validarModalidades(hoja: Excel.Worksheet): Promise<ErrorFormatoImportarExcel[]> {
    const modalidades = await TblModalidades.query()
    const idModalidades = modalidades.map(modalidad => modalidad.id)
    let errores: ErrorFormatoImportarExcel[] = []
    hoja.eachRow(fila => {
      if (fila.number > 1) {
        const nit = fila.getCell('A').value?.valueOf()
        const idModalidad = fila.getCell('B').value?.valueOf()
        const numeroPlaca = fila.getCell('C').value?.valueOf()
        //Validar exitencia
        if (!nit || nit === '') {
          errores.push({
            columna: 'A',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: nit
          })
        }

        if (!idModalidad || idModalidad === '') {
          errores.push({
            columna: 'B',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: idModalidad
          })
        } else {
          if (typeof idModalidad === 'string' || typeof idModalidad === 'number') {
            const existeModalidad = idModalidades.includes(Number(idModalidad))
            if (!existeModalidad) {
              errores.push({
                columna: 'B',
                fila: fila.number.toString(),
                error: `No existe la modalidad con id: ${idModalidad}`,
                valor: idModalidad
              })
            }
          }
        }

        if (!numeroPlaca || numeroPlaca === '') {
          errores.push({
            columna: 'C',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: numeroPlaca
          })
        } else { }
      }
    })
    return errores
  }

  generarCsvErrores(errores: ErrorFormatoImportarExcel[]): Promise<string>{
    const dataCsv: any[][] = []
    const cabeceras = [ "Nro", "Celda", "Descripción" ]
    dataCsv.push(cabeceras)
    errores.forEach( (error, indice) => {
      dataCsv.push([ indice + 1, `${error.columna}${error.fila}`, error.error ])
    })
    return new Promise<string>((resolve, reject) =>{
      csv.stringify(dataCsv, {header: false}, (error, ouput)=>{
        if(error){
          reject(error)
        }else{
          resolve(Buffer.from(ouput).toString('base64'))
        }
      })
    })
  }

}