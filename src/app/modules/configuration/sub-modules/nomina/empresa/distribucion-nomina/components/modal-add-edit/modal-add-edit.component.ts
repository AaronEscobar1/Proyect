import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistribucionNominaService } from '../../services/distribucion-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { DataTableEditComponent } from './data-table-edit/data-table-edit.component';
import { Company } from '../../../empresas/interfaces/compania.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() companias!     : Company[];
  @Input() companiaSelect!: Company | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal = new EventEmitter();
  @Output() onLoadData   = new EventEmitter();

  // Emision de evento componente padre a hijo
  @ViewChild(DataTableEditComponent) dataTableEditComponent!: DataTableEditComponent;

  // Formulario reactivo
  form!: FormGroup;

  constructor(private distribucionNominaService: DistribucionNominaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codemp: [''],
      desemp: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['codemp'].enable();
      this.form.controls['desemp'].enable();
      return;
    }
    this.form.controls['codemp'].disable();
    this.form.controls['desemp'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.companiaSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    this.dataTableEditComponent.guardar();
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.selectRowService.selectRow$.emit(null);
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

}
