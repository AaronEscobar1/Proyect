import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { TypesFile } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { ClasificacionMotivo, MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';

@Component({
  selector: 'app-modal-print',
  templateUrl: './modal-print.component.html',
})
export class ModalPrintComponent implements OnInit {

  @Input() motivosFiniquito!: MotivosFiniquito[];
  @Input() printModal!: boolean;
  @Output() onCloseModalPrint  = new EventEmitter();

  formPrint!: FormGroup

  classificationMotive: ClasificacionMotivo[] = [];


  typesFile   : TypesFile[] = [];

  constructor(
    private motivosFiniquitoService: MotivosFiniquitoService, 
    private fb: FormBuilder,
  ) { 
    this.formPrint = this.fb.group({
      coddes: ['', [ Validators.required, Validators.maxLength(4) ]],
      desde1: ['', [ Validators.required, Validators.maxLength(30) ]],
      desde2: ['', [ Validators.maxLength(30) ]],
      impliq: [ false ],
      classo: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    this.typesFile = [
      { name: 'PDF',  code: 'PDF'  },
      { name: 'CSV',  code: 'CSV'  },
      { name: 'XML',  code: 'XML'  },
      { name: 'RFT',  code: 'RFT'  },
      { name: 'HTML', code: 'HTML' },
      { name: 'XLS',  code: 'XLS'  }
    ];
  }

  export() {

  }

  resetForm(): void {
    this.formPrint.reset();
  }

  closeModalPrint(): void {
    this.onCloseModalPrint.emit();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.formPrint.controls[campo].errors) 
            && (this.formPrint.controls[campo].touched || this.formPrint.controls[campo].dirty)
             && this.formPrint.invalid;
  }

  // Mensajes de errores dinamicos
  get codnivMsgError(): string {
    const errors = this.formPrint.get('codniv')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El código es de longitud de 1 dígito.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desnivMsgError(): string {
    const errors = this.formPrint.get('desniv')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    }
    return '';
  }

}
