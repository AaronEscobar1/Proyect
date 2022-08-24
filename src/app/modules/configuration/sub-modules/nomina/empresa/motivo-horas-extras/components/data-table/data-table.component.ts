import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { MotivoHoraExtra } from '../../interfaces/motivo-horas-extras.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Objeto para mostrar en la tabla
  @Input() motivoHorasExtras!: MotivoHoraExtra[];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',        header: 'Código'      },
      { field: 'nombre',    header: 'Descripción' },
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
