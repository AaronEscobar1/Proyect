import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { dropdownType, Empresa, identificatioType, agentType } from '../../interfaces/empresa.interfaces';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() empresas!     : Empresa[];
  @Input() empresaSelect!: Empresa | undefined;

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

  // Objetos
  identificatioType: dropdownType[] = identificatioType;
  agentType        : dropdownType[] = agentType;

  constructor(private empresaService: EmpresaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codemp: ['', [ Validators.required, Validators.maxLength(4) ]],
      desemp: ['', [ Validators.required, Validators.maxLength(30) ]],
      // Funcionario
      nacionalidad: ['0'],
      tipIden: [''],
      // Contribuyente
      tipAgen: ['']
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
    this.form.reset(this.empresaSelect);
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
    let data: Empresa = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desemp.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('editar', data);
      this.empresas[this.findIndexById(this.form.getRawValue().codemp)] = this.form.getRawValue();
      this.spinner.hide();
      this.closeModal();
      return;
    }
    
    // Crear
    console.log('crear', data);
    this.empresas.push(data);
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.empresas.length; i++) {
      if (this.empresas[i].codemp === id) {
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
