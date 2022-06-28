import { Pipe, PipeTransform } from '@angular/core';
import { TypeFormasPagoEnum } from '../interfaces/formas-pago.interfaces';

@Pipe({
  name: 'transformeTPago'
})
export class TransformeTPagoPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case TypeFormasPagoEnum.efectivo:
        return 'Efectivo';
      case TypeFormasPagoEnum.deposito:
        return 'Deposito';
      case TypeFormasPagoEnum.chequeNoContinuo:
        return 'Cheque no continuo';
      case TypeFormasPagoEnum.chequeContinuo:
        return 'Cheque continuo';
      default:
        return '';
    }
  }

}
