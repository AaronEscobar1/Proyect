import { Injectable } from '@angular/core';
import { Sindicatos } from '../interfaces/sindicatos.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class SindicatosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/sindicatos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/sindicatos/${id}`));
  }

  create(sindicatos: Sindicatos): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/sindicatos'), sindicatos);
  }

  update(sindicatos: Sindicatos): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/sindicatos/${sindicatos.codsin}`), sindicatos);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/sindicatos/${id}`));
  }

  getAllCountry(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/paises'));
  }

  getEntitiesByCountry(codCountry: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/entidadesfederales/${codCountry}`));
  }

}
