import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { OrganismoPublico } from '../../interfaces/organismos-publicos.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

 // Objeto para mostrar en la tabla
 @Input() organismosPublicos: OrganismoPublico[] = [];

 // Table
 columns: TableHead[] = [];

 constructor(private selectRowService: SelectRowService) { }

 ngOnInit(): void {
   this.columns = [
     { field: 'codorg', header: 'Código' },
     { field: 'nomorg', header: 'Nombre' },
     { field: 'siglas', header: 'Siglas' }
   ];
 }

 onRowSelect(event: any): void {
   this.selectRowService.selectRow$.emit(event.data);
 }

 onRowUnselect(): void {
   this.selectRowService.selectRow$.emit(null);
 }

}
