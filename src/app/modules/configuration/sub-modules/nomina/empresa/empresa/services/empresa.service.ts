import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { Empresa } from '../interfaces/empresa.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/empresas'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/empresas/${id}`));
  }

  create(empresa: Empresa): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/empresas'), empresa);
  }

  update(empresa: Empresa): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/empresas/${empresa.codemp}`), empresa);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/empresas/${id}`));
  }

}
