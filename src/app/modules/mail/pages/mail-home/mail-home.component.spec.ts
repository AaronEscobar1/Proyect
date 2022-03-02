import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailHomeComponent } from './mail-home.component';

describe('MailHomeComponent', () => {
  let component: MailHomeComponent;
  let fixture: ComponentFixture<MailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
