import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NivelesEducativos } from '../interfaces/niveles-educativos.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelesEducativosService {

  constructor(private http: HttpClient) { }

  getNivelesAll(): Promise<NivelesEducativos[]> {
    return this.http.get<any>('assets/demo/niveles.json')
      .toPromise()
      .then(res => res.data as NivelesEducativos[])
      .then(data => data);
  }

}
