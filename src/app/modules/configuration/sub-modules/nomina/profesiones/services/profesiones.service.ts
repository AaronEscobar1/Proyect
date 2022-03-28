import { Injectable, EventEmitter } from '@angular/core';
import { Profession } from '../interfaces/professions.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { ResponseBack } from 'src/app/shared/interfaces/response.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionesService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<Profession | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/profesion'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/profesion/${id}`));
  }

  create(profession: Profession): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/profesion'), profession);
  }

  update(profession: Profession): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/profesion/${profession.codprf}`), profession);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/profesion/${id}`));
  }

}
