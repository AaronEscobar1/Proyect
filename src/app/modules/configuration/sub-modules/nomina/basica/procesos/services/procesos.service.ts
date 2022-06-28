import { Injectable } from '@angular/core';
import { Procesos } from '../interfaces/procesos.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/procesos'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/procesos/${id}`));
  }

  create(procesos: Procesos): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/procesos'), procesos);
  }

  update(procesos: Procesos): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/procesos/${procesos.tippro}`), procesos);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/procesos/${id}`));
  }

}
