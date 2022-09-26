import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { ValorGrado, ValorGradoUpdate } from '../interfaces/valores-tabuladores.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValoresGradoTabuladorService {

  private url: string = '/configuraciones/nominas/valoresgrados';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAllValoresGrados(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}`));
  }

  getValoresGradosByGrado(idEmpresa: string, idGrado: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/${idGrado}`));
  }

  create(valorGrado: ValorGrado): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), valorGrado);
  }

  update(valorGrado: ValorGrado, valorGradoUpdate: ValorGradoUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${valorGrado.idEmpresa}/${valorGrado.tabuCodtab}/${valorGrado.fecefe}/${valorGrado.pastab}`), valorGradoUpdate);
  }

  delete(valorGrado: ValorGrado): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${valorGrado.idEmpresa}/${valorGrado.tabuCodtab}/${valorGrado.fecefe}/${valorGrado.pastab}`));
  }

}
