import { Injectable } from '@angular/core';
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

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/grupostrabajo'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/grupostrabajo/${id}`));
  }

  create(grupoTrabajo: GrupoTrabajo): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/grupostrabajo'), grupoTrabajo);
  }

  update(grupoTrabajo: GrupoTrabajo): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/grupostrabajo/${grupoTrabajo.codemp}`), grupoTrabajo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/grupostrabajo/${id}`));
  }

}
