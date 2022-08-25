import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TipoCuenta, TipoCuentaUpdate } from '../interaces/tipo-cuenta.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

  private url: string = '/configuraciones/nominas/equivalencias/tiposcuentasdepositos';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}`));
  }

  create(tipoCuenta: TipoCuenta): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), tipoCuenta);
  }

  update(id: string, TipoCuentaUpdate: TipoCuentaUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/${id}`), TipoCuentaUpdate);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/${id}`));
  }

}
