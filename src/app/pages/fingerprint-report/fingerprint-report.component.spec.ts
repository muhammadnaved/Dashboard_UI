import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintReportComponent } from './fingerprint-report.component';

describe('FingerprintReportComponent', () => {
  let component: FingerprintReportComponent;
  let fixture: ComponentFixture<FingerprintReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerprintReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
