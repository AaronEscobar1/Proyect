import { Injectable, EventEmitter } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { DenominacionMoneda, DenominacionMonedaUpdate } from '../interfaces/denominacion-moneda.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DenominacionService {

  // Variable para obtener el row desde la tabla
  public selectRowTipoMoneda$ = new EventEmitter<any | null>();

  private url: string = '/configuraciones/nominas/valoresmonedas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de denominaciones de monedas por empresa
  getAllDenominacionesByEmpresaNominaTipoMoneda(idEmpresa: string, idNomina: string, idTipoMoneda: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/tiposmonedas/${idTipoMoneda}`));
  }

  create(denominacionMoneda: DenominacionMoneda): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), denominacionMoneda);
  }

  update(denominacionMoneda: DenominacionMoneda, denominacionMonedaUpdate: DenominacionMonedaUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${denominacionMoneda.idEmpresa}/nominas/${denominacionMoneda.idNomina}/tiposmonedas/${denominacionMoneda.idMoneda}/valoresmonedas/${denominacionMoneda.fvigencia}`), denominacionMonedaUpdate);
  }

  delete(denominacionMoneda: DenominacionMoneda): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${denominacionMoneda.idEmpresa}/nominas/${denominacionMoneda.idNomina}/tiposmonedas/${denominacionMoneda.idMoneda}/valoresmonedas/${denominacionMoneda.fvigencia}`));
  }

}
