import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Entrevista } from '../interfaces/entrevista.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/talentos/entrevistas'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/talentos/entrevistas/${id}`));
  }

  create(entrevista: Entrevista): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/talentos/entrevistas'), entrevista);
  }

  update(entrevista: Entrevista): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/talentos/entrevistas/${entrevista.id}`), entrevista);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/talentos/entrevistas/${id}`));
  }
  
}
