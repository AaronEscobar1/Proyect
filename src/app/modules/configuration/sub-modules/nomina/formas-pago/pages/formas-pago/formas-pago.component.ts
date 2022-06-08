import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { FormasPagoService } from '../../services/formas-pago.service';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { FormasPago, TypeFormasPago } from '../../interfaces/formas-pago.interfaces';
import { Helpers } from '../../../../../../../shared/helpers/helpers';

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
  formaPago!: FormasPago | undefined;
  typesPagos : TypeFormasPago[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar formas de pago';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private formasPagoService: FormasPagoService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
  }

  ngOnInit(): void {
    this.typesPagos = [
      {label: 'Efectivo', value: '1'},
      {label: 'Deposito', value: '2'},
      {label: 'Cheque no continuo', value: '3'},
      {label: 'Cheque continuo', value: '4'}
    ];
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.formasPagoService.getAll()
      .pipe(
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
      ).subscribe({
        next: (tpago) => {
          this.formasPagos = tpago;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
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

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar formas de pago' : 'Agregar formas de pago';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.formaPago = undefined;
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
    this.formaPago = formasPago
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
        this.spinner.show();
        this.formasPagoService.delete(formasPago.codpag)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la forma de pago.', life: 3000});
            }
          });
      }
    });
  }

}
