import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';
import { Observable } from 'rxjs';
import { FormasPago } from '../interfaces/formas-pago.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormasPagoService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<FormasPago | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/pagoForma'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/pagoForma/${id}`));
  }

  create(formasPago: FormasPago): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/pagoForma'), formasPago);
  }

  update(formasPago: FormasPago): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/pagoForma/${formasPago.codpag}`), formasPago);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/pagoForma/${id}`));
  }

}
