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
    return this.http.get(this.helpers.getBasicEndPoint('/informacionesadicionales'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/informacionesadicionales/${id}`));
  }

  create(informacionAdicional: InformacionAdicional): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/informacionesadicionales'), informacionAdicional);
  }

  update(informacionAdicional: InformacionAdicional): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/informacionesadicionales/${informacionAdicional.id}`), informacionAdicional);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/informacionesadicionales/${id}`));
  }
  
  getAllTiposInformacionesAdicionales(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/tinformacionesadicionales'));
  }

}
