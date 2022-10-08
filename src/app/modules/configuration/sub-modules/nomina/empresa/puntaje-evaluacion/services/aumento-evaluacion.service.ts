import { Injectable, EventEmitter } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { PuntajeEvaluacion } from '../interfaces/puntaje-evaluacion.interfaces';
import { AumentoEvaluacion, AumentoEvaluacionUpdate } from '../interfaces/aumento-evaluacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AumentoEvaluacionService {

  // Variable para obtener el row desde la tabla aumento
  public selectRowAumento$ = new EventEmitter<any | null>();

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }
  
  // Endpoints de aumento por evaluación
  getAllAumentoByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/aumentos`));
  }

  getAumentoByEmpresaNominaPuntaje(puntajeEvaluacion: PuntajeEvaluacion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${puntajeEvaluacion.idEmpresa}/nominas/${puntajeEvaluacion.idNomina}/aumentos?ideval=${puntajeEvaluacion.codpun}`));
  }

  create(aumentoEvaluacion: AumentoEvaluacion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/empresas/${aumentoEvaluacion.idEmpresa}/nominas/${aumentoEvaluacion.idNomina}/aumentos`), aumentoEvaluacion);
  }

  update(aumentoEvaluacion: AumentoEvaluacion, aumentoEvaluacionUpdate: AumentoEvaluacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${aumentoEvaluacion.idEmpresa}/nominas/${aumentoEvaluacion.idNomina}/aumentos?concepto=${aumentoEvaluacion.idConcepto}&ideval=${aumentoEvaluacion.idEvaluacion}`), aumentoEvaluacionUpdate);
  }

  delete(aumentoEvaluacion: AumentoEvaluacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${aumentoEvaluacion.idEmpresa}/nominas/${aumentoEvaluacion.idNomina}/aumentos?concepto=${aumentoEvaluacion.idConcepto}&ideval=${aumentoEvaluacion.idEvaluacion}`));
  }

}
