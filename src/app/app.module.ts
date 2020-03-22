import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, MatTabsModule, MatSnackBarModule, MatExpansionModule, MatCardModule, MatSelectModule, MatStepperModule, MatButtonModule, MatDialogModule, MatDividerModule} from '@angular/material';
import { GaugeChartModule } from 'angular-gauge-chart';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import { SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { I18nModule } from './i18n/i18n.module';
import { FingerprintComponent } from './pages/fingerprint/fingerprint.component';
import { FingerprintReportComponent } from './pages/fingerprint-report/fingerprint-report.component';
import { OtpDetailComponent } from './modal/otp-detail/otp-detail.component';
import { UserDetailComponent } from './modal/user-detail/user-detail.component';
import { CustpipePipe } from './pipes/custpipe.pipe';
import { FingerprintHeaderComponent } from './pages/fingerprint-header/fingerprint-header.component';
import { FingerprintFooterComponent } from './pages/fingerprint-footer/fingerprint-footer.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    GaugeChartModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    I18nModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, FingerprintComponent, FingerprintReportComponent, OtpDetailComponent, UserDetailComponent, CustpipePipe, FingerprintHeaderComponent, FingerprintFooterComponent],
  entryComponents: [UserDetailComponent, OtpDetailComponent],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  },{
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
