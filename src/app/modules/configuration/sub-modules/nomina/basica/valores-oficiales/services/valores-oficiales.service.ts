import { Injectable } from '@angular/core';
import { ValorOficial } from '../interfaces/valor-oficial.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class ValoresOficialesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/valoresoficiales'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/valoresoficiales/${id}`));
  }

  create(valorOficial: ValorOficial): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/valoresoficiales'), valorOficial);
  }

  update(valorOficial: ValorOficial): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/valoresoficiales/${valorOficial.paisId}/${valorOficial.id}?fecefe=${valorOficial.fecefe}`), valorOficial);
  }

  delete(valorOficial: ValorOficial): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/valoresoficiales/${valorOficial.paisId}/${valorOficial.id}?fecefe=${valorOficial.fecefe}`));
  }

  getAllCountry(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/paises'));
  }

}
