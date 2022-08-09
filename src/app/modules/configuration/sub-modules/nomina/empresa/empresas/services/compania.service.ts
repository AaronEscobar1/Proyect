import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Company } from '../../shared-empresa/interfaces/empresa.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${id}`));
  }

  create(company: Company): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/empresas'), company);
  }

  update(company: Company): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${company.id}`), company);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${id}`));
  }

  getAllCountry(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/organizaciones/paises'));
  }

  getEntitiesByCountry(codCountry: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/entidadesfederales/${codCountry}`));
  }

  getSectoresEmpresas(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/sectoresempresas`));
  }

}
