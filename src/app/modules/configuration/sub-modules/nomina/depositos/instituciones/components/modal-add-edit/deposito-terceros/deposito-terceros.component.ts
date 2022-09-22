import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Institucion } from '../../../interfaces/instituciones.interfaces';
import { InstitucionTercero } from '../../../interfaces/instituciones-terceros.interfaces';
import { BancoInstitucion, TipoTransaccion, TipoPago, TipoDocumento, AgenciaBanco } from '../../../interfaces/endpoints-terceros.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TercerosInstitucionService } from '../../../services/terceros-institucion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormasPago } from '../../../../../basica/formas-pago/interfaces/formas-pago.interfaces';
import { TipoMoneda } from '../../../../../monedas/tipos-monedas/interfaces/tipo-moneda.interfaces';
import { ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';
import { objectEmptyEdit, validateJsonCreate } from './validaciones-terceros';

@Component({
  selector: 'app-deposito-terceros',
  templateUrl: './deposito-terceros.component.html',
  styleUrls: ['./deposito-terceros.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DepositoTercerosComponent implements OnInit {

  // Variable seleccionada en el formulario editar
  @Input() institucionSelect!: Institucion | undefined;

  // Objeto para mostrar terceros de depositos
  @Input() tercerosDeposito!: InstitucionTercero | undefined;

  // Objeto para bancos
  @Input() bancos: BancoInstitucion[] = [];

  // Variable para verificar si tiene data el deposito por tercero
  @Input() hasDataTercero: boolean = false;

  // Objeto para formas de pagos
  @Input() formasPago: FormasPago[] = [];
  
  // Objeto para monedas
  @Input() monedas: TipoMoneda[] = [];
  
  // Objeto para tipos pagos
  @Input() tiposPagos: TipoPago[] = [];
  
  // Objeto para tipos documentos
  @Input() tiposDocumentos: TipoDocumento[] = [];
  
  // Objeto para tipos de transacciones
  @Input() tiposTransacciones: TipoTransaccion[] = [];

  // Objeto para agencias emisor de bancos
  agenciasEmisor: AgenciaBanco[] = [];

  // Objeto para agencias receptor de bancos
  agenciasReceptor: AgenciaBanco[] = [];

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onLoadData = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  constructor(private tercerosInstitucionService: TercerosInstitucionService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,) {
    this.form = this.fb.group({
      idEmpresa:            [ ],
      tipiCodtip:           [ ],
      codins:               [ ],
      bancoEmisorObj:       this.fb.group({
        codBanco:           [ ]
      }),
      agenciaEmisor:        [ ],
      tipoPagoEmisorObj:    this.fb.group({
        tipoPago:           [ ]
      }),
      pagoFormaEmisorObj:   this.fb.group({
        codpag:             [ ]
      }),
      monedaEmisorObj:      this.fb.group({
        id:                 [ ]
      }),
      bancoReceptorObj:     this.fb.group({
        codBanco:           [ ]
      }),
      agenciaReceptor:      [ ],
      tipoPagoReceptorObj:  this.fb.group({
        tipoPago:           [ ]
      }),
      pagoFormaReceptorObj: this.fb.group({
        codpag:             [ ]
      }),
      monedaReceptorObj:    this.fb.group({
        id:                 [ ]
      }),
      tipoDocumentoObj:     this.fb.group({
        tipoDocu:           [ ]
      }),
      tipoTransaccionObj:   this.fb.group({
        tipoTransac:        [ ]
      }),
      version:              [  , [ Validators.maxLength(10) ]],
      texto1:               [  , [ Validators.maxLength(60) ]],
      texto2:               [  , [ Validators.maxLength(60) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if ( !this.hasDataTercero ) {
      this.form.reset();
      this.form.controls['agenciaEmisor'].disable();
      this.form.controls['agenciaReceptor'].disable();
      return;
    }
    this.form.controls['agenciaEmisor'].disable();
    this.form.controls['agenciaReceptor'].disable();
    // Agregamos objetos vacios para omitir error 'Cannot read properties of null'
    if ( this.tercerosDeposito ) {
      this.tercerosDeposito = objectEmptyEdit(this.tercerosDeposito);
    }
    // Cargar lista de agencia emisor
    if ( this.tercerosDeposito && this.tercerosDeposito.bancoEmisorObj && this.tercerosDeposito.bancoEmisorObj.codBanco ) {
      this.loadAgencias(this.tercerosDeposito.bancoEmisorObj.codBanco, 'emisor');
    }
    // Cargar lista de agencia receptor
    if ( this.tercerosDeposito && this.tercerosDeposito.bancoReceptorObj && this.tercerosDeposito.bancoReceptorObj.codBanco ) {
      this.loadAgencias(this.tercerosDeposito.bancoReceptorObj.codBanco, 'receptor');
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tercerosDeposito);
  }

  /**
   * Realiza petición al backend para buscar las agencias relacionadas con el banco seleccionado
   * @param event: ObjectEventChange
   */
  bancoSelectChange(event: ObjectEventChange, tipoBanco: string): void {
    const codBanco = event.value;
    if (codBanco == null) { return; }
    // Limpiamos el campo agencia emisor o receptor segun sea el caso
    tipoBanco == 'emisor' ? this.form.controls['agenciaEmisor'].reset() : this.form.controls['agenciaReceptor'].reset();
    // Peticion al backend para buscar las agencias emisor o receptor segun sea el caso
    tipoBanco == 'emisor' ? this.loadAgencias(codBanco, 'emisor') : this.loadAgencias(codBanco, 'receptor');
  }

  /**
   * Carga las agencias relacionadas con el banco
   * @param codBanco: string código banco a buscar
   * @param tipoBanco: string, admite solo emisor y receptor
   */
  loadAgencias(codBanco: string, tipoBanco: string): void {
    tipoBanco == 'emisor' ? this.agenciasEmisor = [] : this.agenciasReceptor = [];
    this.spinner.show();
    this.tercerosInstitucionService.getAgenciasBancos(codBanco)
      .subscribe({
        next: (resp) => {
          tipoBanco == 'emisor' ? this.agenciasEmisor = resp : this.agenciasReceptor = resp;
          tipoBanco == 'emisor' ? this.form.controls['agenciaEmisor'].enable() : this.form.controls['agenciaReceptor'].enable();
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Limpia el campo país que se muestra en el formulario
   * @param tipoBanco: string
   */
  clearBancoSelect(tipoBanco: string) {
    tipoBanco == 'emisor' ? this.agenciasEmisor = [] : this.agenciasReceptor = [];
    tipoBanco == 'emisor' ? this.form.controls['agenciaEmisor'].reset() : this.form.controls['agenciaReceptor'].reset();
    tipoBanco == 'emisor' ? this.form.controls['agenciaEmisor'].disable() : this.form.controls['agenciaReceptor'].disable();
  }

  /**
   * Guardar y actualizar registros de parametros iniciales
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    const data: InstitucionTercero = this.form.getRawValue();
    // Eliminar objetos donde la propiedad sea en null
    const dataMap = validateJsonCreate(data);

    this.spinner.show();

    // Editar
    if ( this.hasDataTercero ) {
      const { idEmpresa, tipiCodtip, codins, ...dataUpdate } = dataMap;
      this.tercerosInstitucionService.update(dataMap, dataUpdate)
        .subscribe({
          next: (resp) => {
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadData.emit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el deposito a terceros.', life: 3000});
          } 
        });
      return;
    }

    // Asignar idEmpresa, tipiCodtip y codins
    if ( !this.institucionSelect ) {  return; }
    data.idEmpresa  = this.institucionSelect.idEmpresa;
    data.tipiCodtip = this.institucionSelect.tipiCodtip;
    data.codins     = this.institucionSelect.codins;
    // Crear
    this.tercerosInstitucionService.create(dataMap)
      .subscribe({
        next: (resp) => {
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
          this.hasDataTercero = true;
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el deposito a terceros.', life: 3000});
        }
      });
  }

  /**
   * Elimina registro deposito a tercero 
   * @param tercerosDeposito: InstitucionTercero
   */
  delete(tercerosDeposito: InstitucionTercero| undefined): void {
    if ( !tercerosDeposito ) { 
      return;
    }
    this.confirmationService.confirm({
      message: `¿Desea eliminar este deposito a tercero?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tercerosInstitucionService.delete(tercerosDeposito)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.onLoadData.emit();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el deposito a tercero, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el deposito a tercero.', life: 3000});
              return false;
            }
          });
      }
    });
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
