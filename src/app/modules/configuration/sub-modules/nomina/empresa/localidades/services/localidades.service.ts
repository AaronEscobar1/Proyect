import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Localidad } from '../interfaces/localidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  private url: string = '/configuraciones/nominas/empresas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getLocalidadesByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/localidades`));
  }

  create(idEmpresa: string, localidad: Localidad): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/localidades`), localidad);
  }

  update(idEmpresa: string, localidad: Localidad): Observable<any> {
    const { codloc, ...localidadUpdate } = localidad;
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/localidades/${localidad.codloc}`), localidadUpdate);
  }

  delete(idEmpresa: string, localidad: Localidad): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/localidades/${localidad.codloc}`));
  }
  
}
