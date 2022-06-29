import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Parentesco } from '../interfaces/parentesco.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ParentescoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/parentescos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/parentescos/${id}`));
  }

  create(parentesco: Parentesco): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/parentescos'), parentesco);
  }

  update(parentesco: Parentesco): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/parentescos/${parentesco.id}`), parentesco);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/parentescos/${id}`));
  }
  
}
