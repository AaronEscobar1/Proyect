import { EventEmitter, Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SituacionService {

  // Variable para obtener el row desde la tabla
  public selectRowSituacion$ = new EventEmitter<any | null>();
  
  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Obtener todas las nominas por empresa
  getAllNominasByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas`));
  }

  // Endpoints de situaciones
  getAllSituacionesByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${idEmpresa}/${idNomina}`));
  }

  getSituacionByEmpresaNominaSituacion(idEmpresa: string, idNomina: string, idSituacion: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${idEmpresa}/${idNomina}/${idSituacion}`));
  }

  create(situacion: any): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones`), situacion);
  }

  update(situacion: any, situacionUptate: any): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${situacion.idEmpresa}/${situacion.idNomina}/${situacion.codpun}`), situacionUptate);
  }

  delete(situacion: any): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/situaciones/${situacion.idEmpresa}/${situacion.idNomina}/${situacion.codpun}`));
  }
  
}
