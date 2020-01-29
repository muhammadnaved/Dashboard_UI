import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintFooterComponent } from './fingerprint-footer.component';

describe('FingerprintFooterComponent', () => {
  let component: FingerprintFooterComponent;
  let fixture: ComponentFixture<FingerprintFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerprintFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
