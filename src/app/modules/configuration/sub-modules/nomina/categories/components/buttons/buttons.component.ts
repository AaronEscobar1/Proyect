import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styles: []
})
export class ButtonsComponent implements OnInit {

  @Output() onRefresh         = new EventEmitter();
  @Output() onOpenModalPrint  = new EventEmitter();
  @Output() onOpenModalCreate = new EventEmitter();
  @Output() onEditRow         = new EventEmitter();
  @Output() onDeleteRow       = new EventEmitter();
  
  // Variable para seleccionar el registro
  selectRow!: any | null;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private categoriesService: CategoriesService) {
  }
  
  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.categoriesService.selectRow$.subscribe( row => this.selectRow = row );
  }

  refresh(): void {
    this.onRefresh.emit();
  }

  openModalPrint(): void {
    this.onOpenModalPrint.emit();
  }

  openModalCreate(): void {
    this.onOpenModalCreate.emit();
  }

  editSelectRow(): void {
    this.onEditRow.emit(this.selectRow);
  }

  deleteRow(): void {
    this.onDeleteRow.emit(this.selectRow);
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
