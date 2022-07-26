import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { DistribucionNomina } from '../interfaces/distribucion-impuesto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DistribucionNominaService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAllDistribuciones(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${id}/distribucionesnomina`));
  }

  getById(id: string, idDistribucion: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${id}/distribucionesnomina/${idDistribucion}`));
  }

  create(idEmpresa: string, distribucionNomina: DistribucionNomina): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/distribucionesnomina`), distribucionNomina);
  }

  update(idEmpresa: string, distribucionNomina: DistribucionNomina): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/distribucionesnomina/${distribucionNomina.codsuc}`), distribucionNomina);
  }

  delete(distribucionNomina: DistribucionNomina): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${distribucionNomina.idEmpresa}/distribucionesnomina/${distribucionNomina.codsuc}`));
  }

}
