import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateFakeLoader,TranslateLoader,TranslateModule,TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [ TranslateService ]
    }).compileComponents();
  });

  it('Crear app correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('ng After View Init correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    app.ngAfterViewInit()
    
  });

});
