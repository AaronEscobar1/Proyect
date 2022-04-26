import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { TypesFile } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

@Component({
  selector: 'app-modal-print',
  templateUrl: './modal-print.component.html',
})
export class ModalPrintComponent implements OnInit {

  @Input() niveles!: NivelesEducativos[];
  @Input() printNivelModal!: boolean;
  @Output() onCloseModalPrint  = new EventEmitter();

  formPrint!: FormGroup

  typesFile   : TypesFile[] = [];

  constructor(
    private nivelesServices: NivelesEducativosService, 
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private helpers: Helpers
  ) { 
    this.formPrint = this.fb.group({
      codley: ['', [ Validators.required, Validators.pattern('[1-9]'), Validators.maxLength(1)]],
      desniv: ['', [ Validators.required, Validators.maxLength(30)]],
      type: ['', [ Validators.maxLength(3) ]]
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

  exportPdf() {
    // Obtener formulario
    let data = this.formPrint.getRawValue();
    console.log(data);
    this.nivelesServices.selectRow$.emit(null);
    this.resetForm();
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
