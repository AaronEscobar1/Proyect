import { AfterViewInit, Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig, MessageService } from "primeng/api";
import { Helpers } from './shared/helpers/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService ]
})
export class AppComponent implements AfterViewInit {
 
  constructor(private primengConfig: PrimeNGConfig,
              private translateService: TranslateService,
              private helpers: Helpers,
              private messageService: MessageService,
              private router: Router,
              ) { }

  
  @HostListener("window:beforeunload", ["$event"])
  clearTabId() {
    if(sessionStorage['TabId'] == localStorage['TabId']) localStorage.removeItem('TabId');
  }
  ngAfterViewInit() {
    this.getMultiTabsDetection();
    this.translateChange('es');
  }

  /*
  * Método de verificacion global para detectar multi pestañas y avisar al usuario
  */
  getMultiTabsDetection() {
    let result = this.helpers.detectMultiTabs();
    if (result) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se permiten multiples pestañas.', life: 2000, closable: false});
      setTimeout(() =>{
        this.router.navigateByUrl('/error');
      }, 1500);
    }
  }

  translateChange(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
