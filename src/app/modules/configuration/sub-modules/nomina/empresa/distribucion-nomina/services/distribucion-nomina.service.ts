import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { EmpresaNomina } from '../interfaces/distribucion-impuesto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DistribucionNominaService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/distribucionnomina'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/distribucionnomina/${id}`));
  }

  create(empresaNomina: EmpresaNomina): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/distribucionnomina'), empresaNomina);
  }

  update(empresaNomina: EmpresaNomina): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/distribucionnomina/${empresaNomina.codemp}`), empresaNomina);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/distribucionnomina/${id}`));
  }

}
