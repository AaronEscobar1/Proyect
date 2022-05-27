import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Localidades } from '../interfaces/localidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/localidades'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/localidades/${id}`));
  }

  create(localidades: Localidades): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/localidades'), localidades);
  }

  update(localidades: Localidades): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/localidades/${localidades.codloc}`), localidades);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/localidades/${id}`));
  }

}
