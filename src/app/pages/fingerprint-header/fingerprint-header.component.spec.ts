import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintHeaderComponent } from './fingerprint-header.component';

describe('FingerprintHeaderComponent', () => {
  let component: FingerprintHeaderComponent;
  let fixture: ComponentFixture<FingerprintHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerprintHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
