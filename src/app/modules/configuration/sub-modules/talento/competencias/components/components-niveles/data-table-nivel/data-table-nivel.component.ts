import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Niveles } from '../../../interfaces/nivel.interfaces';

@Component({
  selector: 'app-data-table-nivel',
  templateUrl: './data-table-nivel.component.html',
  styleUrls: ['./data-table-nivel.component.scss']
})
export class DataTableNivelComponent implements OnInit {

  @Input() niveles!: Niveles[];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'nivel',   header: 'Nombre'      },
      { field: 'descrip', header: 'Descripción' }
    ]
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRowAlterno$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRowAlterno$.emit(null);
  }

}
