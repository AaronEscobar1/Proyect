import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Situacion } from '../interfaces/situacion.interfaces';
import { ConceptoSituacion, ConceptoSituacionCreate, ConceptoSituacionUpdate } from '../interfaces/concepto-situacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConceptoSituacionService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de situaciones
  getAllConceptosSituacion(situacion: Situacion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/conceptos`));
  }

  getConceptoSituacion(situacion: Situacion, concepto: ConceptoSituacion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/conceptos/${concepto.idConcepto}`));
  }

  create(situacion: Situacion, concepto: ConceptoSituacionCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/conceptos`), concepto);
  }

  update(situacion: Situacion, idConcepto: string, conceptoUptate: ConceptoSituacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/conceptos/${idConcepto}`), conceptoUptate);
  }

  delete(situacion: Situacion, concepto: ConceptoSituacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${situacion.idEmpresa}/nominas/${situacion.idNomina}/situaciones/${situacion.codsta}/conceptos/${concepto.idConcepto}`));
  }

  // Suspension por vacación
  getSuspensionVacacion(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/suspencionesvacaciones`));
  }
}
