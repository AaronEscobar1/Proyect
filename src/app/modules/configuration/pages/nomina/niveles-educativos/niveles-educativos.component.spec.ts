import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelesEducativosComponent } from './niveles-educativos.component';

describe('NivelesEducativosComponent', () => {
  let component: NivelesEducativosComponent;
  let fixture: ComponentFixture<NivelesEducativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelesEducativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelesEducativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
