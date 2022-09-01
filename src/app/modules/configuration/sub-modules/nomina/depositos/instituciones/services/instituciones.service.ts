import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Institucion, InstitucionUpdate } from '../interfaces/instituciones.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getInstitucionesByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/institucionesdepositos/empresas/${idEmpresa}`));
  }

  create(institucion: Institucion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/institucionesdepositos/`), institucion);
  }

  update(institucion: Institucion, institucionUpdate: InstitucionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/institucionesdepositos/empresas/${institucion.idEmpresa}/tiposinstitucionesdepositos/${institucion.tipiCodtip}/${institucion.codins}`), institucionUpdate);
  }

  delete(institucion: Institucion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/institucionesdepositos/empresas/${institucion.idEmpresa}/tiposinstitucionesdepositos/${institucion.tipiCodtip}/${institucion.codins}`));
  }

}
