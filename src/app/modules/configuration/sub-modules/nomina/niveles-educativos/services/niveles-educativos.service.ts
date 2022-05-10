import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { NivelesEducativos } from '../interfaces/niveles-educativos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NivelesEducativosService {


  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getNivelesAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/niveleseducativos'));
  }

  getNivelById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/niveleseducativos/${id}`));
  }
  
  createNivel(nivel: NivelesEducativos): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/niveleseducativos'), nivel);
  }

  updateNivel(nivel: NivelesEducativos): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/niveleseducativos/${nivel.codniv}`), nivel);
  }

  deleteNivel(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/niveleseducativos/${id}`));
  }

}
