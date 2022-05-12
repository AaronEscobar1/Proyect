import { Injectable, EventEmitter } from '@angular/core';
import { Profession } from '../interfaces/professions.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionesService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<Profession | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/profesiones'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/profesiones/${id}`));
  }

  create(profession: Profession): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/profesiones'), profession);
  }

  update(profession: Profession): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/profesiones/${profession.codprf}`), profession);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/profesiones/${id}`));
  }

}
