import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Situacion, SituacionUpdate } from '../interfaces/situacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SituacionService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de situaciones
  getAllSituacionesByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${idEmpresa}/${idNomina}`));
  }

  getSituacionByEmpresaNominaSituacion(idEmpresa: string, idNomina: string, idSituacion: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${idEmpresa}/${idNomina}/${idSituacion}`));
  }

  create(situacion: Situacion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones`), situacion);
  }

  update(situacion: Situacion, situacionUptate: SituacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${situacion.idEmpresa}/${situacion.idNomina}/${situacion.codsta}`), situacionUptate);
  }

  delete(situacion: Situacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${situacion.idEmpresa}/${situacion.idNomina}/${situacion.codsta}`));
  }

  // Estatus vacaciones
  getEstatusVacaciones(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/estatusvacaciones`));
  }

  // Esquema de trabajos
  getEsquemaTrabajo(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/esquemastrabajos`));
  }

  // Clases de situaciones
  getClasesSituaciones(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/clasessituaciones`));
  }
  
}
