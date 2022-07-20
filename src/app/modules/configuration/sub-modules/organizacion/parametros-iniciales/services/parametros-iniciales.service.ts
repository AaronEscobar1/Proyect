import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ParametrosIniciales } from '../interfaces/parametros-iniciales.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ParametrosInicialesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/parametrosiniciales'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/parametrosiniciales/${id}`));
  }

  create(parametrosIniciales: ParametrosIniciales): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/parametrosiniciales'), parametrosIniciales);
  }

  update(parametrosIniciales: ParametrosIniciales): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/parametrosiniciales/${parametrosIniciales.id_empresa}`), parametrosIniciales);
  }

  getTiposVacacionesPorVender(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/tiposvacacionesvencer'));
  }
  
}
