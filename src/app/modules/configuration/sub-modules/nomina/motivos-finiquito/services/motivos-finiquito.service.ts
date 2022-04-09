import { EventEmitter, Injectable } from '@angular/core';
import { MotivosFiniquito } from '../interfaces/motivos-finiquito.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MotivosFiniquitoService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<MotivosFiniquito | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/motivo-finiquito'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/motivo-finiquito/${id}`));
  }

  create(motivoFiniquito: MotivosFiniquito): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/motivo-finiquito'), motivoFiniquito);
  }

  update(motivoFiniquito: MotivosFiniquito): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/motivo-finiquito/${motivoFiniquito.codmot}`), motivoFiniquito);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/motivo-finiquito/${id}`));
  }
}
