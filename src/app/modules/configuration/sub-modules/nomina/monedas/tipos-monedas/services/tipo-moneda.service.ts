import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TipoMoneda, TipoMonedaUpdate } from '../interfaces/tipo-moneda.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoMonedaService {

  private url: string = '/configuraciones/nominas/tiposmonedas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}`));
  }

  create(tipoMoneda: TipoMoneda): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), tipoMoneda);
  }

  update(id: string, tipoMonedaUpdate: TipoMonedaUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/${id}`), tipoMonedaUpdate);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/${id}`));
  }

}
