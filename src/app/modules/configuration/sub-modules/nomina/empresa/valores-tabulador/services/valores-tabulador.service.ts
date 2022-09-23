import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { GradoCreate, GradoCreateUpdate } from '../interfaces/grados-tabuladores.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValoresTabuladorService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/grados/empresas/${idEmpresa}`));
  }

  getById(idGrados: string, idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/grados/${idGrados}/empresas/${idEmpresa}`));
  }

  create(gradoCreate: GradoCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/grados`), gradoCreate);
  }

  update(gradoCreate: GradoCreate, gradoCreateUpdate: GradoCreateUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/grados/${gradoCreate.id}/empresas/${gradoCreate.idEmpresa}`), gradoCreateUpdate);
  }

  delete(idGrados: string, idEmpresa: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/grados/${idGrados}/empresas/${idEmpresa}`));
  }

}
