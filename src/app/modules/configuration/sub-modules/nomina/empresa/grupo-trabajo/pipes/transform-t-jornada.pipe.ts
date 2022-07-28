import { Pipe, PipeTransform } from '@angular/core';
import { tipoJornadaData } from '../interfaces/grupo-trabajo.interfaces';

@Pipe({
  name: 'transformTJornada'
})
export class TransformTJornadaPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case tipoJornadaData[0].value:
        return tipoJornadaData[0].label;
      case tipoJornadaData[1].value:
        return tipoJornadaData[1].label;
      case tipoJornadaData[2].value:
          return tipoJornadaData[3].label;
      case tipoJornadaData[3].value:
        return tipoJornadaData[3].label;
      case tipoJornadaData[4].value:
        return tipoJornadaData[4].label;
      case tipoJornadaData[5].value:
        return tipoJornadaData[5].label;
      default:
        return '';
    }
  }

}
