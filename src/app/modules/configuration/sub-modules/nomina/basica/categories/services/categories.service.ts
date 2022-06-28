import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Categories } from '../interfaces/categories.interfaces';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

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
