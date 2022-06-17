import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { TipoIdentificacion } from '../interfaces/tipo-identificacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getNivelesAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/tiposidentificacion'));
  }

  getNivelById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/tiposidentificacion/${id}`));
  }

  createNivel(tipoIdentificacion: TipoIdentificacion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/tiposidentificacion'), tipoIdentificacion);
  }

  updateNivel(tipoIdentificacion: TipoIdentificacion): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/tiposidentificacion/${tipoIdentificacion.id}`), tipoIdentificacion);
  }

  deleteNivel(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/tiposidentificacion/${id}`));
  }
  
}
