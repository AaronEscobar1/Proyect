import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { NivelesEducativos } from '../interfaces/niveles-educativos.interfaces';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NivelesEducativosService {

  public selectRow$ = new EventEmitter<NivelesEducativos | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getNivelesAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/nivelEducativo'));
  }

  getNivelById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/nivelEducativo/${id}`));
  }
  
  createNivel(nivel: NivelesEducativos): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/nivelEducativo'), nivel);
  }

  updateNivel(nivel: NivelesEducativos): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/nivelEducativo/${nivel.codniv}`), nivel);
  }

  deleteNivel(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/nivelEducativo/${id}`));
  }

}
