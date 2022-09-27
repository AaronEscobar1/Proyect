import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { Grados } from '../../../interfaces/grados-tabuladores.interfaces';
import { ValorGrado } from '../../../interfaces/valores-tabuladores.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { ValoresGradoTabuladorService } from '../../../services/valores-grado-tabulador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit-valores',
  templateUrl: './modal-add-edit-valores.component.html'
})
export class ModalAddEditValoresComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de grado tabulador seleccionado para obtener el id
  @Input() gradoTabuladorSelect!: Grados | undefined;

  // Objeto para validaciones de valores duplicados
  @Input() valoresGrados: ValorGrado[] = [];
  
  // Objeto valor grado seleccionado de la tabla
  @Input() valorGradoSelect: ValorGrado | undefined;

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
  
  constructor(private companyNominaService: CompanyNominaService,
              private valoresGradoTabuladorService: ValoresGradoTabuladorService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:   [ ],
      tabuCodtab:  [ ],
      fecefe:      [ , [ Validators.required ]],
      pastab:      [ , [ Validators.required, Validators.pattern('[0-9]{1,2}') ] ],
      valtab:      [ , [ Validators.required, this.validateValor.bind(this) ] ],
      eoGradoTb:   this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      })
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['fecefe'].enable();
      this.form.controls['pastab'].enable();
      return;
    }
    this.form.controls['fecefe'].disable();
    this.form.controls['pastab'].disable();
    // Comprobar si el tipo de informacion tiene fecha para darle formato y establecerlo en el formulario
    if ( this.valorGradoSelect ) {
      this.valorGradoSelect.fecefe = new Date(this.valorGradoSelect.fecefe);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.valorGradoSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: ValorGrado = this.form.getRawValue();

    if (!this.gradoTabuladorSelect) { 
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No ha seleccionado un grado.', life: 3000});
      return;
    }
    
    // Formatear fecha para crear
    data.fecefe = `${new Date(data.fecefe).toISOString().slice(0, 10)}T00:00:00`;
    
    this.spinner.show();
            
    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, fecefe, pastab, tabuCodtab,...dataUpdate } = data;
      this.valoresGradoTabuladorService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el valor de grado.', life: 3000});
        }
      });
      return;
    }
    
    
    // Llenar información solicitada por backend con el objeto personalizado
    data.idEmpresa  = this.gradoTabuladorSelect.eoGradoTbId.idEmpresa;
    data.tabuCodtab = this.gradoTabuladorSelect.eoGradoTbId.id;
    data.eoGradoTb.eoGradoTbId.idEmpresa = this.gradoTabuladorSelect.eoGradoTbId.idEmpresa;
    data.eoGradoTb.eoGradoTbId.id        = this.gradoTabuladorSelect.eoGradoTbId.id;
    // Crear
    this.valoresGradoTabuladorService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el valor de grado.', life: 3000});
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
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Mensajes de errores paso
  get pastabMsgError(): string {
    const errors = this.form.get('pastab')?.errors;
    if ( errors?.required ) {
      return 'El paso es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El paso es de longitud máxima de 2 dígitos, formato numérico.';
    }
    return '';
  }

  // Mensajes de errores valtab
  get valtabMsgError(): string {
    const errors = this.form.get('valtab')?.errors;
    if ( errors?.required ) {
      return 'El valor es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El valor es de longitud de 7 enteros y 5 decimales, formato numérico.';
    }
    return '';
  }

  // Validar que cumpla con la expresión regular 7 numeros enteros y 5 decimales maximo
  validateValor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valorPattern = new RegExp(/^([0-9]{1,7})(\.[0-9]{1,5})?$/g);
    return !valorPattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }

}
