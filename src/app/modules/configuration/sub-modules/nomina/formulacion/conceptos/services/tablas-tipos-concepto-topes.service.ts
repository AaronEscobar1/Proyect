import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablasTiposConceptoTopesService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  /** Tipos elementos cálculos */
  getAllTiposElementosCalculos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tiposelementoscalculos`));
  }

  /** Tipos topes parámetros */
  getAllTiposTopesParametros(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tipostopesparametros`));
  }

}
