import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TarifaImpuesto } from '../../interfaces/tarifas-impuestos.interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TarifasImpuestosService } from '../../services/tarifas-impuestos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() tarifasImpuestos!    : TarifaImpuesto[];
  @Input() tarifaImpuestoSelect!: TarifaImpuesto | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  constructor(private tarifasImpuestosService: TarifasImpuestosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codtar: [''],
      destar: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['codtar'].enable();
      return;
    }
    this.form.controls['codtar'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tarifaImpuestoSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    console.log('formulario', this.form.getRawValue());
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: TarifaImpuesto = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.destar.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('editar', data);
      this.tarifasImpuestos[this.findIndexById(this.form.getRawValue().codtar)] = this.form.getRawValue();
      this.spinner.hide();
      this.closeModal();
      return;
    }
    
    // Crear
    console.log('crear', data);
    this.tarifasImpuestos.push(data);
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.tarifasImpuestos.length; i++) {
      if (this.tarifasImpuestos[i].codtar === id) {
        index = i;
        break;
      }
    }
    return index;
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
