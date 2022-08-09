import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { OtrosDatosEmpresa } from '../../../interfaces/otros-datos-empresa.interfaces';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';

@Component({
  selector: 'app-buttons-od',
  templateUrl: './buttons-od.component.html'
})
export class ButtonsOdComponent implements OnInit {

  @Input() otrosDatosEmpresaSelect: OtrosDatosEmpresa | undefined = undefined;

  @Output() onOpenModalCreate = new EventEmitter();
  @Output() onEditRow         = new EventEmitter();
  @Output() onDeleteRow       = new EventEmitter();
  
  // Variable para seleccionar el registro
  selectRowAlterno: Company | null = null;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor( private selectRowService: SelectRowService ) {
  }
  
  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowService.selectRowAlterno$.subscribe( row => this.selectRowAlterno = row );
  }

  // Mediante la compentencia seleccionada se envia al metodo el ROW para poder crear y obtener el ID
  openModalCreate(): void {
    this.onOpenModalCreate.emit(this.selectRowAlterno);
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
