import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { InformacionAdicional } from '../interfaces/informacion-adicional.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InformacionAdicionalService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/talentos/datosadicionales'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/talentos/datosadicionales/${id}`));
  }

  create(informacionAdicional: InformacionAdicional): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/talentos/datosadicionales'), informacionAdicional);
  }

  update(informacionAdicional: InformacionAdicional): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/talentos/datosadicionales/${informacionAdicional.id}`), informacionAdicional);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/talentos/datosadicionales/${id}`));
  }
  
  getAllEmpresas(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/empresas'));
  }

  getAllTiposInformacionesAdicionales(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/talentos/tiposdatosadicionales'));
  }

}
