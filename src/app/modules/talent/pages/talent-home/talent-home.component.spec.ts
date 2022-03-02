import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentHomeComponent } from './talent-home.component';

describe('TalentHomeComponent', () => {
  let component: TalentHomeComponent;
  let fixture: ComponentFixture<TalentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
