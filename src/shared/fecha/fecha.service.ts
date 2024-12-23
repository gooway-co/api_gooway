import { Injectable } from '@nestjs/common';

@Injectable()
export class FechaService {
  obtenerDiasRecorridos(fecha: string): number {
    // Define dos fechas
    if (fecha.length > 8) {
      const fechaSplit = fecha.split('-');
      const ano = parseInt(fechaSplit[0], 10);
      const mes = parseInt(fechaSplit[1], 10) - 1; // Los meses en JavaScript son de 0-11
      const dia = parseInt(fechaSplit[2], 10);
      const fecha2 = new Date(ano, mes, dia, 0, 0); // Ejemplo: 16 de octubre de 2023 a las 12:00 PM
      const fecha1 = new Date(); // Fecha actual

      // Resta las fechas
      const diferencia = fecha1.getTime() - fecha2.getTime();
      const diferenciaEnDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      return diferenciaEnDias;
    } else {
      return 0;
    }
  }

  obtenerDiferenciaFecha(fecha1: string, fecha2: string): number {
    // Define dos fechas
    if (fecha1.length > 8) {
      const fechaSplit1 = fecha1.split('-');
      const ano1 = parseInt(fechaSplit1[0], 10);
      const mes1 = parseInt(fechaSplit1[1], 10) - 1; // Los meses en JavaScript son de 0-11
      const dia1 = parseInt(fechaSplit1[2], 10);
      const fechaDate1 = new Date(ano1, mes1, dia1, 0, 0); // Ejemplo: 16 de octubre de 2023 a las 12:00 PM

      const fechaSplit2 = fecha2.split('-');
      const ano2 = parseInt(fechaSplit2[0], 10);
      const mes2 = parseInt(fechaSplit2[1], 10) - 1;
      const dia2 = parseInt(fechaSplit2[2], 10);
      const fechaDate2 = new Date(ano2, mes2, dia2, 0, 0); // Ejemplo: 16 de octubre de 2023 a las 12:00 PM

      // Resta las fechas
      const diferencia = fechaDate1.getTime() - fechaDate2.getTime();
      const diferenciaEnDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      return diferenciaEnDias;
    } else {
      return 0;
    }
  }

  sumarDiasAFecha(fechaOriginal: string, diasASumar: number): string {
    // Parsea la fecha original a un objeto Date
    const fecha = new Date(fechaOriginal);

    // Suma los días
    fecha.setDate(fecha.getDate() + diasASumar);

    // Formatea la fecha en el formato deseado (yyyy-MM-dd)
    const ano = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0-11
    const dia = fecha.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}
