import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { GrupoTrabajo } from '../interfaces/grupo-trabajo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GrupoTrabajoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAllGruposByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/grupos`));
  }

  getGrupoById(idEmpresa: string, idNomina: string, idGrupo: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/grupos/${idGrupo}`));
  }

  create(idEmpresa: string, idNomina: string, grupoTrabajo: GrupoTrabajo): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/grupos`), grupoTrabajo);
  }

  update(idEmpresa: string, idNomina: string, grupoTrabajo: GrupoTrabajo): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/grupos/${grupoTrabajo.codgru}`), grupoTrabajo);
  }

  delete(idEmpresa: string, idNomina: string, idGrupo: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/grupos/${idGrupo}`));
  }

}
