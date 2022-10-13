import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { OrganismoPublicoUpdate, OrganismoPublico } from '../interfaces/organismos-publicos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrganismosPublicosService {

  private url: string = '/configuraciones/nominas/organismospublicos';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}`));
  }

  create(organismoPublico: OrganismoPublico): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), organismoPublico);
  }

  update(codorg: string, organismoPublicoUpdate: OrganismoPublicoUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/${codorg}`), organismoPublicoUpdate);
  }

  delete(codorg: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/${codorg}`));
  }

}
