"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FechaService = void 0;
const common_1 = require("@nestjs/common");
let FechaService = class FechaService {
    obtenerDiasRecorridos(fecha) {
        if (fecha.length > 8) {
            const fechaSplit = fecha.split('-');
            const ano = parseInt(fechaSplit[0], 10);
            const mes = parseInt(fechaSplit[1], 10) - 1;
            const dia = parseInt(fechaSplit[2], 10);
            const fecha2 = new Date(ano, mes, dia, 0, 0);
            const fecha1 = new Date();
            const diferencia = fecha1.getTime() - fecha2.getTime();
            const diferenciaEnDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            return diferenciaEnDias;
        }
        else {
            return 0;
        }
    }
    obtenerDiferenciaFecha(fecha1, fecha2) {
        if (fecha1.length > 8) {
            const fechaSplit1 = fecha1.split('-');
            const ano1 = parseInt(fechaSplit1[0], 10);
            const mes1 = parseInt(fechaSplit1[1], 10) - 1;
            const dia1 = parseInt(fechaSplit1[2], 10);
            const fechaDate1 = new Date(ano1, mes1, dia1, 0, 0);
            const fechaSplit2 = fecha2.split('-');
            const ano2 = parseInt(fechaSplit2[0], 10);
            const mes2 = parseInt(fechaSplit2[1], 10) - 1;
            const dia2 = parseInt(fechaSplit2[2], 10);
            const fechaDate2 = new Date(ano2, mes2, dia2, 0, 0);
            const diferencia = fechaDate1.getTime() - fechaDate2.getTime();
            const diferenciaEnDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            return diferenciaEnDias;
        }
        else {
            return 0;
        }
    }
    sumarDiasAFecha(fechaOriginal, diasASumar) {
        const fecha = new Date(fechaOriginal);
        fecha.setDate(fecha.getDate() + diasASumar);
        const ano = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
};
exports.FechaService = FechaService;
exports.FechaService = FechaService = __decorate([
    (0, common_1.Injectable)()
], FechaService);
//# sourceMappingURL=fecha.service.js.map