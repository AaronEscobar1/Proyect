import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Company } from '../interfaces/compania.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/empresas'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/empresas/${id}`));
  }

  create(company: Company): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/empresas'), company);
  }

  update(company: Company): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/empresas/${company.id}`), company);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/empresas/${id}`));
  }

  getAllCountry(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/paises'));
  }

  getEntitiesByCountry(codCountry: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/entidadesfederales/${codCountry}`));
  }

}
