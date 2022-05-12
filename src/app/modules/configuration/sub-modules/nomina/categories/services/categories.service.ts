import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Categories } from '../interfaces/categories.interfaces';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<Categories | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/categorias'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/categorias/${id}`));
  }

  create(categories: Categories): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/categorias'), categories);
  }

  update(categories: Categories): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/categorias/${categories.codcat}`), categories);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/categorias/${id}`));
  }

}
