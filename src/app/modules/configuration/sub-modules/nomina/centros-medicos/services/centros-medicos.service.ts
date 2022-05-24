import { Injectable, EventEmitter } from '@angular/core';
import { CentrosMedicos } from '../interfaces/centro-medico.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentrosMedicosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/centrosmedicos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/centrosmedicos/${id}`));
  }

  create(centroMedico: CentrosMedicos): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/centrosmedicos'), centroMedico);
  }

  update(centroMedico: CentrosMedicos): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/centrosmedicos/${centroMedico.codmed}`), centroMedico);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/centrosmedicos/${id}`));
  }

}
