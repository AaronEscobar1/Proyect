import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../../nomina/empresa/shared-empresa/interfaces/empresa.interfaces';
import { InformacionAdicional, TipoInformacionAdicional } from '../../interfaces/informacion-adicional.interfaces';
import { InformacionAdicionalService } from '../../services/informacion-adicional.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() informacionesAdicionales!    : InformacionAdicional[];
  @Input() informacionAdicionalSelect!  : InformacionAdicional | undefined;
  @Input() tiposInformacionesAdicionales: TipoInformacionAdicional[] = [];
  @Input() empresas!                    : Company[];

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal = new EventEmitter();
  @Output() onLoadData   = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;
  maxLengthDescrip: number = 2048;

  constructor(private informacionAdicionalService: InformacionAdicionalService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      idEmpresa: ['', [ Validators.required ]],
      id       : ['', [ Validators.required, Validators.maxLength(32), this.validatedId.bind(this) ]],
      nombre   : ['', [ Validators.required, Validators.maxLength(64) ]],
      tipoInfo : ['', [ Validators.required ]],
      descrip  : ['', [ Validators.required, Validators.maxLength(2048) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (!this.isEdit) {
      this.form.reset();
      this.form.controls['idEmpresa'].enable();
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['idEmpresa'].disable();
    this.form.controls['id'].disable();
    this.form.reset(this.informacionAdicionalSelect); 
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: InformacionAdicional = this.form.getRawValue();
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.informacionAdicionalService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRow$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la información adicional.', life: 3000});
        }
      });
      return;
    }

    // Crear
    this.informacionAdicionalService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRow$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la información adicional.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 32 dígitos y de formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) {
      return 'El nombre es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nombre es de longitud máxima de 64 dígitos y de formato alfanumérico.';
    }
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.informacionesAdicionales.findIndex(val => val.id === control.value) > -1 ?
                                                  {'duplicated': true} :
                                                  null;
  }

}
