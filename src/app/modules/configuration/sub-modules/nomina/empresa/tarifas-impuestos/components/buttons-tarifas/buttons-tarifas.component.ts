import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-buttons-tarifas',
  templateUrl: './buttons-tarifas.component.html'
})
export class ButtonsTarifasComponent implements OnInit {

  @Output() onRefresh         = new EventEmitter();
  @Output() onOpenModalPrint  = new EventEmitter();
  @Output() onOpenModalCreate = new EventEmitter();
  @Output() onEditRow         = new EventEmitter();
  @Output() onDeleteRow       = new EventEmitter();
  
  // Variable para seleccionar el registro
  selectRow!: any | null;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor( private selectRowService: SelectRowService ) { }
  
  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowService.selectRowAlterno$.subscribe( row => this.selectRow = row );
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
