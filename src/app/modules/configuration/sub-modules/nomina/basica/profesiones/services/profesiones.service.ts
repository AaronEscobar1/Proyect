import { Injectable } from '@angular/core';
import { Profession } from '../interfaces/professions.interfaces';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/profesiones'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/profesiones/${id}`));
  }

  create(profession: Profession): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/profesiones'), profession);
  }

  update(profession: Profession): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/profesiones/${profession.codprf}`), profession);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/profesiones/${id}`));
  }

}
