import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { PuntajeEvaluacion, PuntajeEvaluacionUpdate } from '../interfaces/puntaje-evaluacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PuntajeEvaluacionService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de puntaje de evaluacion  
  getAllPuntajesByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/puntajesevaluaciones/${idEmpresa}/${idNomina}`));
  }

  getPuntajeByEmpresaNominaPuntaje(idEmpresa: string, idNomina: string, idPuntaje: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/puntajesevaluaciones/${idEmpresa}/${idNomina}/${idPuntaje}`));
  }

  create(puntajeEvaluacion: PuntajeEvaluacion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/puntajesevaluaciones`), puntajeEvaluacion);
  }

  update(puntajeEvaluacion: PuntajeEvaluacion, puntajeEvaluacionUptate: PuntajeEvaluacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/puntajesevaluaciones/${puntajeEvaluacion.idEmpresa}/${puntajeEvaluacion.idNomina}/${puntajeEvaluacion.codpun}`), puntajeEvaluacionUptate);
  }

  delete(puntajeEvaluacion: PuntajeEvaluacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/puntajesevaluaciones/${puntajeEvaluacion.idEmpresa}/${puntajeEvaluacion.idNomina}/${puntajeEvaluacion.codpun}`));
  }

}
