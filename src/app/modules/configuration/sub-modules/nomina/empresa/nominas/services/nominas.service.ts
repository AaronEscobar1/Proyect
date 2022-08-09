import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Nomina } from '../interfaces/nominas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NominasService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getNominaByEmpresa(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}`));
  }

  create(idEmpresa: string, nomina: Nomina): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas`), nomina);
  }

  update(nomina: Nomina): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${nomina.idEmpresa}/nominas/${nomina.tipnom}`), nomina);
  }

  delete(nomina: Nomina): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${nomina.idEmpresa}/nominas/${nomina.tipnom}`));
  }
}
