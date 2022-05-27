import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TarifaImpuesto } from '../interfaces/tarifas-impuestos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TarifasImpuestosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/tarifasimpuestos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/tarifasimpuestos/${id}`));
  }

  create(tarifaImpuesto: TarifaImpuesto): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/tarifasimpuestos'), tarifaImpuesto);
  }

  update(tarifaImpuesto: TarifaImpuesto): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/tarifasimpuestos/${tarifaImpuesto.codtar}`), tarifaImpuesto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/tarifasimpuestos/${id}`));
  }
}
