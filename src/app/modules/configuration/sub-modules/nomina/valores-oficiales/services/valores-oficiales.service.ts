import { Injectable } from '@angular/core';
import { ValorOficial } from '../interfaces/valor-oficial.interfaces';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class ValoresOficialesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/valor-oficial'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/valor-oficial/${id}`));
  }

  create(valorOficial: ValorOficial): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/valor-oficial'), valorOficial);
  }

  update(valorOficial: ValorOficial): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/valor-oficial/${valorOficial.codvlo}`), valorOficial);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/valor-oficial/${id}`));
  }

}
