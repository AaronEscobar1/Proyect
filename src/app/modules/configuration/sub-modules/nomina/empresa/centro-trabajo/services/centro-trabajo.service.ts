import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from '../../../../../../../shared/services/http/http.service';
import { Observable } from 'rxjs';
import { CentroTrabajo } from '../interfaces/distribucion-impuesto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CentroTrabajoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrostrabajos`));
  }

  getAllCentrosTrabajosByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrostrabajos/${idEmpresa}`));
  }

  getCentroTrabajoByEmpresa(idEmpresa: string, centroTrabajo: CentroTrabajo): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrostrabajos/${idEmpresa}/${centroTrabajo.codcen}`));
  }

  create(centroTrabajo: CentroTrabajo): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrostrabajos`), centroTrabajo);
  }

  update(idEmpresa: string, centroTrabajo: CentroTrabajo): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrostrabajos/${idEmpresa}/${centroTrabajo.codcen}`), centroTrabajo);
  }

  delete(centroTrabajo: CentroTrabajo): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/centrostrabajos/${centroTrabajo.idEmpresa}/${centroTrabajo.codcen}`));
  }

}
