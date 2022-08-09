import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../../nomina/empresa/shared-empresa/interfaces/empresa.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() companias!: Company[];
  @Input() tab: string = 'consultar';
  
  @Output() onLoadAdditionalData = new EventEmitter();

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',     header: 'Código'      },
      { field: 'nombre', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    const companySelect: Company = event.data;
    switch (this.tab) {
      case 'consultar':
        this.selectRowService.selectRow$.emit(companySelect);
        return;
      default:
        return;
    }
  }

  onRowUnselect(): void {
    switch (this.tab) {
      case 'consultar':
        this.selectRowService.selectRow$.emit(null);
        return;
      default:
        return;
    }
  }

}
