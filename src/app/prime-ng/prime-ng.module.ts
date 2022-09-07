import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from "primeng/skeleton";
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ContextMenuModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    ImageModule,
    InputTextareaModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    FieldsetModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    PanelMenuModule,
    PanelModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    SkeletonModule,
    SpeedDialModule,
    TableModule,
    TabViewModule,
    ToastModule
  ]
})
export class PrimeNgModule { }