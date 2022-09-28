import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Situacion } from '../interfaces/situacion.interfaces';
import { Observable } from 'rxjs';
import { ProcesoSituacion, ProcesoSituacionCreate, ProcesoSituacionUpdate } from '../interfaces/proceso-situacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProcesoSituacionService {

  private baseUrlModule: string = '/configuraciones/nominas/empresas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de procesos situaciones
  getAllProcesosSituacion(situacion: Situacion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/procesos`));
  }

  getProcesoSituacion(situacion: Situacion, proceso: ProcesoSituacion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/procesos/${proceso.procTippro}/${proceso.tipsub}`));
  }

  create(procesoSituacion: ProcesoSituacion, procesoCreate: ProcesoSituacionCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${procesoSituacion.idEmpresa}/nominas/${procesoSituacion.idNomina}/situaciones/${procesoSituacion.statCodsta}/procesos`), procesoCreate);
  }

  update(procesoSituacion: ProcesoSituacion, procesoUpdate: ProcesoSituacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${procesoSituacion.idEmpresa}/nominas/${procesoSituacion.idNomina}/situaciones/${procesoSituacion.statCodsta}/procesos/${procesoSituacion.procTippro}/${procesoSituacion.tipsub}`), procesoUpdate);
  }

  delete(procesoSituacion: ProcesoSituacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${procesoSituacion.idEmpresa}/nominas/${procesoSituacion.idNomina}/situaciones/${procesoSituacion.statCodsta}/procesos/${procesoSituacion.procTippro}/${procesoSituacion.tipsub}`));
  }

  // Suspension por vacación
  getSuspensionVacacion(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/suspencionesvacaciones`));
  }

  // Obtener procesos
  getProcesos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/procesos`));
  }

  // Obtener sub procesos
  getSubProcesosByProceso(codProceso: number): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/procesos/${codProceso}/subprocesos`));
  }

}
