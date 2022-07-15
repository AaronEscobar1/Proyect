import { Injectable } from '@angular/core';
import { CentrosMedicos } from '../interfaces/centro-medico.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class CentrosMedicosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/centrosmedicos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrosmedicos/${id}`));
  }

  create(centroMedico: CentrosMedicos): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/centrosmedicos'), centroMedico);
  }

  update(centroMedico: CentrosMedicos): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrosmedicos/${centroMedico.codmed}`), centroMedico);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrosmedicos/${id}`));
  }

}
