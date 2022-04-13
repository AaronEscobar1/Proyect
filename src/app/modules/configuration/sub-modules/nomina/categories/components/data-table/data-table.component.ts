import { Component, OnInit, Input } from '@angular/core';
import { Categories } from '../../interfaces/categories.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() categories!: Categories[];

  // Table
  columns: TableHead[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codcat', header: 'Código' },
      { field: 'descat', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.categoriesService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.categoriesService.selectRow$.emit(null);
  }

}
