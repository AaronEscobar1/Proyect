import { Injectable, EventEmitter } from '@angular/core';
import { Procesos } from '../interfaces/procesos.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<Procesos | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/procesos'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/procesos/${id}`));
  }

  create(procesos: Procesos): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/procesos'), procesos);
  }

  update(procesos: Procesos): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/procesos/${procesos.codpro}`), procesos);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/procesos/${id}`));
  }

}
