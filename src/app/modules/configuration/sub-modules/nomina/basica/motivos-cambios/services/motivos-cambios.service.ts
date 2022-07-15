import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { MotivosCambios } from '../interfaces/motivos-cambios.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MotivosCambiosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/motivoscambios'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/motivoscambios/${id}`));
  }

  create(motivosCambios: MotivosCambios): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/motivoscambios'), motivosCambios);
  }

  update(motivosCambios: MotivosCambios): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/motivoscambios/${motivosCambios.codcam}`), motivosCambios);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/motivoscambios/${id}`));
  }
}
