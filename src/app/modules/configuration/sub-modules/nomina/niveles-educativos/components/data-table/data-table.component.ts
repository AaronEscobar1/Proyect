import { Component, Input, OnInit } from '@angular/core';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() niveles!: NivelesEducativos[];

  columns       : any[]             = [];

  constructor(private nivelesServices: NivelesEducativosService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codniv', header: 'Código' },
      { field: 'desniv', header: 'Descripción' },
      { field: 'codley', header: 'Oficial' }
    ]
  }

  onRowSelect(event: any): void {    
    this.nivelesServices.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.nivelesServices.selectRow$.emit(null);
  }
}
