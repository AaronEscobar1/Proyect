import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypesFile } from '../../../niveles-educativos/interfaces/typesFiles.interfaces';
import { FormasPagoService } from '../../services/formas-pago.service';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { FormasPago, TypeFormasPago } from '../../interfaces/formas-pago.interfaces';
import { map } from 'rxjs/operators';
import { ResponseBack } from '../../../../../../../shared/interfaces/response.interfaces';

@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  styleUrls: ['./formas-pago.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class FormasPagoComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  formasPagos: FormasPago[] = [];
  typesFile  : TypesFile[] = [];
  typesPagos : TypeFormasPago[] = [];

  // Banderas
  isEdit: boolean = false;

  // Cargar table
  loading : boolean = false;

  // Modales
  titleForm  : string = 'Agregar formas de pago';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private formasPagoService: FormasPagoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codpag: ['', [ Validators.required, Validators.maxLength(1), this.validatedId.bind(this) ]],
      despag: ['', [ Validators.required, Validators.maxLength(30), this.validatedDespag.bind(this)]],
      conins: ['', [ Validators.required ]],
    });
  }

  ngOnInit(): void {
    this.typesPagos = [
      {label: 'Efectivo', value: '1'},
      {label: 'Deposito', value: '2'},
      {label: 'Cheque no continuo', value: '3'},
      {label: 'Cheque continuo', value: '4'}
    ];
    this.typesFile = [
      { name: 'PDF',  code: 'PDF'  },
      { name: 'CSV',  code: 'CSV'  },
      { name: 'XML',  code: 'XML'  },
      { name: 'RFT',  code: 'RFT'  },
      { name: 'HTML', code: 'HTML' },
      { name: 'XLS',  code: 'XLS'  }
    ];
    this.loadData();
  }

  loadData() {
    this.loading = true;
     this.formasPagoService.getAll()
     .pipe(
        map((resp: ResponseBack) => resp.data),
        // Se agrega un valor atributo adicional "coninsString" para mostrarlo en la vista
        map((data: FormasPago[]) => {
          return data.map(tpago => {
            const tipoPago = tpago.conins === '1' ? 'Efectivo' :
                             tpago.conins === '2' ? 'Deposito' :
                             tpago.conins === '3' ? 'Cheque no continuo' :
                             tpago.conins === '4' ? 'Cheque continuo' : '';
            return {...tpago, coninsString: tipoPago };
          });
        }),
     ).subscribe(tpago => {
      this.formasPagos = tpago;
      this.loading = false;
    });
  }

  refresh(): void {
    this.formasPagos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    if (!this.isEdit) {
      this.form.controls['codpag'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar formas de pago' : 'Agregar formas de pago';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.form.reset();
    this.createModal = false;
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Mandar el formulario completo y quitar espacios en blancos
    let data: FormasPago = this.form.getRawValue();
    data.despag.trim();

    if(this.isEdit) {
      this.formasPagoService.update(data)
        .subscribe( resp => {
          this.closeModal();
          this.loadData();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        });
      return;
    } 

    this.formasPagoService.create(data)
      .subscribe( resp => {
        this.closeModal();
        this.loadData();
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
      });
  }

  /**
   * Carga la data en el formulario para editar
   * @param formasPago row de la tabla
   * @returns void
   */
  editRow(formasPago: FormasPago): void {
    this.isEdit = true;
    if (!formasPago) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codpag'].disable();
    this.form.reset(formasPago);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param formasPago row de la tabla
   * @returns void
   */
  deleteRow(formasPago: FormasPago): void {
    if (!formasPago) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la forma de pago <b>${formasPago.despag}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.formasPagoService.delete(formasPago.codpag)
          .subscribe( resp => {
            this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          });
      }
    });
  }

  export() {

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
  get codpagMsgError(): string {
    const errors = this.form.get('codpag')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 1 dígito.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get despagMsgError(): string {
    const errors = this.form.get('despag')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
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
      const duplicated = this.formasPagos.findIndex(formapago => formapago.codpag === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

   /**
   * Validar descripcion duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedDespag(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value && !this.form.getRawValue() && this.formasPagos) { return null; }
      const duplicatedEdit = this.formasPagos.findIndex(
        formaPago => formaPago.despag.trim().toLowerCase() === this.form.getRawValue().despag.trim().toLowerCase() 
                  && formaPago.codpag !== this.form.getRawValue().codpag
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.formasPagos.findIndex(formaPago => formaPago.despag.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
