import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { Nomina, daysData, redondeoData } from '../../interfaces/nominas.interfaces';
import { NominasService } from '../../services/nominas.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() nominas: Nomina[] = [];

  // Variable de seleccion para editar
  @Input() nominaSelect!: Nomina | undefined;

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

  // Objetos
  days:     any = daysData;
  redondeo: any = redondeoData;

  // Variable para mover pestaña de la vista por si existe un error
  tabIndex = 0;
  
  constructor(private nominasService: NominasService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      /**** Basica ****/
        idEmpresa: [ ],
        clanom: [  ],
        tipnom: [  , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ] ],
        desnom: [  , [ Validators.required,  Validators.maxLength(40) ] ],
        /* Frecuencia */
        frenom: [  , [ Validators.required] ],
        fresue: [ ],
        anocom: [ ],
        /* Fechas topes */
        fecto1:  [ ],
        fecto2:  [ ],
        fecto3:  [ ],
        fecto4:  [ ],
        fecto5:  [ ],
        fecto6:  [ ],
        fecto7:  [ ],
        fecto8:  [ ],
        fecto9:  [ ],
        fecto10: [ ],
        /* Redondeo */
        valred: [ ],
        pgmrec: [  , [ Validators.maxLength(10) ] ],
        /* Guardería */
        canmin: [  , [ Validators.pattern('[0-9]{1,2}') ] ],
        topgua: [  , [ this.validateSalario.bind(this) ] ],    
        facgua: [  , [ this.validateFactor.bind(this) ] ],
      /**** Miscelanea ****/
        /* Sencillo en fondo */
        asifon: [  , [ Validators.pattern('[0-9]{1,4}') ] ],
        dedfon: [  , [ Validators.pattern('[0-9]{1,4}') ] ],
        valfon: [  , [ this.validateValorVac.bind(this) ]],
        /* Vacación */
        tipfec: [  ],
        fecabo: [  ],
        reghab: [  ]
    });
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { clanom: '2', frenom: 7, valred: 0.1, pgmrec: 'NM3185H', tipfec: '1' };
      this.form.reset(initForm);
      this.tabIndex = 0;
      this.form.controls['tipnom'].enable();
      return;
    }
    this.form.controls['tipnom'].disable();
    // Comprobar si la nomina tiene fechas para darle formato y establecerlo para poder editar
    if( this.nominaSelect ) {
      this.nominaSelect.fecto1  = this.nominaSelect.fecto1  ? new Date(this.nominaSelect.fecto1)  : null;
      this.nominaSelect.fecto2  = this.nominaSelect.fecto2  ? new Date(this.nominaSelect.fecto2)  : null;
      this.nominaSelect.fecto3  = this.nominaSelect.fecto3  ? new Date(this.nominaSelect.fecto3)  : null;
      this.nominaSelect.fecto4  = this.nominaSelect.fecto4  ? new Date(this.nominaSelect.fecto4)  : null;
      this.nominaSelect.fecto5  = this.nominaSelect.fecto5  ? new Date(this.nominaSelect.fecto5)  : null;
      this.nominaSelect.fecto6  = this.nominaSelect.fecto6  ? new Date(this.nominaSelect.fecto6)  : null;
      this.nominaSelect.fecto7  = this.nominaSelect.fecto7  ? new Date(this.nominaSelect.fecto7)  : null;
      this.nominaSelect.fecto8  = this.nominaSelect.fecto8  ? new Date(this.nominaSelect.fecto8)  : null;
      this.nominaSelect.fecto9  = this.nominaSelect.fecto9  ? new Date(this.nominaSelect.fecto9)  : null;
      this.nominaSelect.fecto10 = this.nominaSelect.fecto10 ? new Date(this.nominaSelect.fecto10) : null;
      this.nominaSelect.fecabo  = this.nominaSelect.fecabo  ? new Date(this.nominaSelect.fecabo)  : null;
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.nominaSelect);
    // Validamos si la propiedad fresue es = 1, si es = 1 le asignamos true para marcar el check
    (this.nominaSelect && this.nominaSelect.fresue) === "1" ? this.form.controls['fresue'].reset(true) : this.form.controls['fresue'].reset(false);
    // Validamos si la propiedad anocom es = 1, si es = 1 le asignamos true para marcar el check
    (this.nominaSelect && this.nominaSelect.anocom) === "1" ? this.form.controls['anocom'].reset(true) : this.form.controls['anocom'].reset(false);
    // Validamos si la propiedad reghab es = 1, si es = 1 le asignamos true para marcar el check
    (this.nominaSelect && this.nominaSelect.reghab) === "1" ? this.form.controls['reghab'].reset(true) : this.form.controls['reghab'].reset(false);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if(this.form.invalid) {
      this.tabIndex = 0;
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Nomina = this.form.getRawValue();

    // Si el campo Tipo fecha esta vacio, colocar 1 por defecto
    data.tipfec ? data.tipfec : data.tipfec = 1 ;
    
    // Si el check de estos campos esta seleccionado se coloca el valor 1, de lo contrario 0
    data.fresue = data.fresue ? '1' : '0';
    data.anocom = data.anocom ? '1' : '0';
    data.reghab = data.reghab ? '1' : '0';

    // Validamos que si se rellenó algún campo en la sección "Sencillo en fondo", validar que existan los 3 campos (asignación, deducción y valor) 
    if ( (data.asifon && !data.dedfon) || (data.asifon && !data.valfon) ||
            (data.dedfon && !data.asifon) || (data.dedfon && !data.valfon) ||
              (data.valfon && !data.asifon) || (data.valfon && !data.dedfon) ) {
      this.tabIndex = 1;
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Si selecciona al menos un campo en la sección sencillo en fondo, debe seleccionar todos los campos.', life: 5000});
      return;
    }

    console.log(data);
    this.spinner.show();

    if (this.isEdit) {
      this.nominasService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRowAlterno$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la nómina.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    const idEmpresa = this.empresaRow.id;

    this.nominasService.create(idEmpresa, data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRowAlterno$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la nómina.', life: 3000});
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

  // Mensajes de errores dinamicos
  get tipnomMsgError(): string {
    const errors = this.form.get('tipnom')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos y formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desnomMsgError(): string {
    const errors = this.form.get('desnom')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 40 dígitos y formato alfanumérico.';
    }
    return '';
  }

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.nominas.findIndex(val => val.tipnom === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

  // Validar que cumpla con la expresión regular 16 números enteros y 9 decimales máximos
  validateSalario(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,16})(\.[0-9]{1,9})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

  // Validar que cumpla con la expresión regular 12 números enteros y 10 decimales máximos
  validateFactor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,12})(\.[0-9]{1,10})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

  // Validar que cumpla con la expresión regular 5 números enteros y 2 decimales máximos
  validateValorVac(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,5})(\.[0-9]{1,2})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }


}
