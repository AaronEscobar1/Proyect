import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { EstadoCivil } from '../interfaces/estado-civil.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/organizaciones/estadosciviles'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/estadosciviles/${id}`));
  }

  create(estadoCivil: EstadoCivil): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/organizaciones/estadosciviles'), estadoCivil);
  }

  update(estadoCivil: EstadoCivil): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/estadosciviles/${estadoCivil.id}`), estadoCivil);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/estadosciviles/${id}`));
  }

}
