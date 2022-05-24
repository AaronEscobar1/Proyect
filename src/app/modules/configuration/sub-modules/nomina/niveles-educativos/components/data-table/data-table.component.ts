import { Component, Input, OnInit } from '@angular/core';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() niveles!: NivelesEducativos[];

  columns       : any[]             = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codniv', header: 'Código' },
      { field: 'desniv', header: 'Descripción' },
      { field: 'codley', header: 'Oficial' }
    ]
  }

  onRowSelect(event: any): void {    
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }
}
