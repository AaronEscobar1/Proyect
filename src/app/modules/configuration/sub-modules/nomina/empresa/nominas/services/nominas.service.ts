import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Nominas } from '../interfaces/nominas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NominasService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/nominas'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/nominas/${id}`));
  }

  create(nomina: Nominas): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/nominas'), nomina);
  }

  update(nomina: Nominas): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/nominas/${nomina.codnom}`), nomina);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/nominas/${id}`));
  }
}
