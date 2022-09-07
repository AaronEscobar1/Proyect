import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenesService } from '../../../services/imagenes.service';

@Component({
  selector: 'app-buttons-imagen',
  templateUrl: './buttons-imagen.component.html'
})
export class ButtonsImagenComponent implements OnInit {

  @Output() onRefresh         = new EventEmitter();
  @Output() onOpenModalCreate = new EventEmitter();
  @Output() onDeleteRow       = new EventEmitter();

  // Variable para seleccionar el registro
  selectRow!: any | null;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor( private imagenesService: ImagenesService ) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.imagenesService.selectRowTable$.subscribe( row => this.selectRow = row );
  }

  refresh(): void {
    this.onRefresh.emit();
  } 

  openModalCreate(): void {
    this.onOpenModalCreate.emit();
  }

  deleteRow(): void {
    this.onDeleteRow.emit(this.selectRow);
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
