import { Injectable, EventEmitter } from '@angular/core';
import { Sindicatos } from '../interfaces/sindicatos.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SindicatosService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<Sindicatos | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/sindicatos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/sindicatos/${id}`));
  }

  create(sindicatos: Sindicatos): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/sindicatos'), sindicatos);
  }

  update(sindicatos: Sindicatos): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/sindicatos/${sindicatos.codsin}`), sindicatos);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/sindicatos/${id}`));
  }
}
