import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TipoInformacion, TipoInformacionCreate, TipoInformacionUpdate } from '../interfaces/tipo-informacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoInformacionService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getTiposInformacionByEmpresaAndClase(idEmpresa: string, idClase: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/tiposdeinformaciones/clasesdeinformaciones/${idClase}`));
  }

  create(idEmpresa: string, tipoInformacionCreate: TipoInformacionCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/tiposdeinformaciones`), tipoInformacionCreate);
  }

  update(idEmpresa: string, tipoInformacion: TipoInformacionCreate, tipoInformacionUpdate: TipoInformacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/tiposdeinformaciones/${tipoInformacion.id}/clasesdeinformaciones/${tipoInformacion.idClase}`), tipoInformacionUpdate);
  }

  delete(tipoInformacion: TipoInformacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${tipoInformacion.idEmpresa}/tiposdeinformaciones/${tipoInformacion.id}/clasesdeinformaciones/${tipoInformacion.idClase}`));
  }

}
