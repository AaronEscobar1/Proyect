import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { FormasPago, FormasPagoUpdate } from '../interfaces/formas-pago.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormasPagoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/pagoformas'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/pagoformas/${id}`));
  }

  create(formasPago: FormasPago): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/pagoformas'), formasPago);
  }

  update(formasPago: FormasPago, formasPagoUpdate: FormasPagoUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/pagoformas/${formasPago.codpag}`), formasPagoUpdate);
  }

  delete(formasPago: FormasPago): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/pagoformas/${formasPago.codpag}`));
  }

}
