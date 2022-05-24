import { EventEmitter, Injectable } from '@angular/core';
import { MotivosFiniquito } from '../interfaces/motivos-finiquito.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotivosFiniquitoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/motivosfiniquito'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/motivosfiniquito/${id}`));
  }

  create(motivoFiniquito: MotivosFiniquito): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/motivosfiniquito'), motivoFiniquito);
  }

  update(motivoFiniquito: MotivosFiniquito): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/motivosfiniquito/${motivoFiniquito.coddes}`), motivoFiniquito);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/motivosfiniquito/${id}`));
  }
}
