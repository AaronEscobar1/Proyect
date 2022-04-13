import { Injectable, EventEmitter } from '@angular/core';
import { CentroMedico } from '../interfaces/centro-medico.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CentrosMedicosService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<CentroMedico | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/centro-medico'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/centro-medico/${id}`));
  }

  create(centroMedico: CentroMedico): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/centro-medico'), centroMedico);
  }

  update(centroMedico: CentroMedico): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/centro-medico/${centroMedico.codcmd}`), centroMedico);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/centro-medico/${id}`));
  }

}
