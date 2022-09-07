import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Imagen, ImagenUpdate } from '../interfaces/imagenes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  // Variable para obtener el row desde la tercera tabla
  public selectRowTable$ = new EventEmitter<any | null>();

  private url: string = '/configuraciones/organizaciones/empresas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getImagenesByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/imagenes`));
  }

  create(idEmpresa: string, imagen: Imagen): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/imagenes`), imagen);
  }

  update(imagen: Imagen, imagenUpdate: ImagenUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/${imagen.empresaId}/imagenes/${imagen.tipo}`), imagenUpdate);
  }

  delete(idEmpresa: string, imagen: Imagen): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/${idEmpresa}/imagenes/${imagen.tipo}`));
  }

}
