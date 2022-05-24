import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';
import { FormasPago } from '../interfaces/formas-pago.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormasPagoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/pagoformas'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/pagoformas/${id}`));
  }

  create(formasPago: FormasPago): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/pagoformas'), formasPago);
  }

  update(formasPago: FormasPago): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/pagoformas/${formasPago.codpag}`), formasPago);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/pagoformas/${id}`));
  }

}
