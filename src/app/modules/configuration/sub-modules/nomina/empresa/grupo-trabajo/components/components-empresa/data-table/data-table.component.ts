import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../../empresas/interfaces/compania.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() companias!: Company[];
  @Input() tab: string = 'consultar';

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
    this.selectRowService.selectRow$.emit(companySelect);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
