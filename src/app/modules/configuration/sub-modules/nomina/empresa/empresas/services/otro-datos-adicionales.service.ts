import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { OtrosDatosEmpresa } from '../interfaces/otros-datos-empresa.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OtroDatosAdicionalesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getDatosAdicionalesByIdEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/datosadicionales`));
  }

  create(otrosDatosEmpresa: OtrosDatosEmpresa): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${otrosDatosEmpresa.idEmpresa}/datosadicionales`), otrosDatosEmpresa);
  }

  update(otrosDatosEmpresa: OtrosDatosEmpresa): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${otrosDatosEmpresa.idEmpresa}/datosadicionales`), otrosDatosEmpresa);
  }

  delete(idEmpresa: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/datosadicionales`));
  }

}
