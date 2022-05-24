import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectRowService {
  
  // Variable para obtener el row desde la tabla
  public selectRow$ = new EventEmitter<any | null>();
  
  constructor() {  }

  
}
