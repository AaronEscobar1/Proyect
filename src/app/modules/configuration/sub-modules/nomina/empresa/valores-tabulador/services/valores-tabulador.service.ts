import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Grados, ValoresGrados } from '../interfaces/valores-tabulador.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValoresTabuladorService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/grados/empresas/${id}`));
  }

  getById(idGrados: string, idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/grados/${idGrados}/empresas/${idEmpresa}`));
  }

  create(ValoresGradosEmpresa: Grados): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/grados`), ValoresGradosEmpresa);
  }

  update(idGrados: string, idEmpresa: string, ValoresGradosEmpresa: Grados): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/grados/${idGrados}/empresas/${idEmpresa}`), ValoresGradosEmpresa);
  }

  delete(idGrados: string, idEmpresa: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/grados/${idGrados}/empresas/${idEmpresa}`));
  }

}
