import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-buttons-nivel',
  templateUrl: './buttons-nivel.component.html'
})
export class ButtonsNivelComponent implements OnInit {

  @Output() onRefresh         = new EventEmitter();
  @Output() onOpenModalCreate = new EventEmitter();
  @Output() onEditRow         = new EventEmitter();
  @Output() onDeleteRow       = new EventEmitter();
  
  // Variable para seleccionar el registro
  selectRow!: any | null;
  selectRowAlterno!: any | null;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor( private selectRowService: SelectRowService ) {
  }
  
  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowService.selectRow$.subscribe( row => this.selectRow = row );
    this.subscriber = this.selectRowService.selectRowAlterno$.subscribe( row => this.selectRowAlterno = row );
  }

  refresh(): void {
    this.onRefresh.emit();
  } 

  // Mediante la compentencia seleccionada se envia al metodo el ROW para poder crear y obtener el ID
  openModalCreate(): void {
    this.onOpenModalCreate.emit(this.selectRow);
  }

  editSelectRow(): void {
    this.onEditRow.emit(this.selectRowAlterno);
  }

  deleteRow(): void {
    this.onDeleteRow.emit(this.selectRowAlterno);
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
