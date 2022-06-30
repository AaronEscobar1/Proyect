import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectRowService {
  
  // Variable para obtener el row desde la tabla
  public selectRow$        = new EventEmitter<any | null>();
  // Variable para obtener un row y editar otro componente de otra tabla
  public selectRowAlterno$ = new EventEmitter<any | null>();
  
  constructor() {  }

  
}
