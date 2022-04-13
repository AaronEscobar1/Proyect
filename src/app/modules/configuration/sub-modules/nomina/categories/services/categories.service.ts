import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Categories } from '../interfaces/categories.interfaces';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<Categories | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/categories'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/categories/${id}`));
  }

  create(categories: Categories): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/categories'), categories);
  }

  update(categories: Categories): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/categories/${categories.codcat}`), categories);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/categories/${id}`));
  }

}
