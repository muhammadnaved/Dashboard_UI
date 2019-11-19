import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AngularFontAwesomeModule} from "angular-font-awesome";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { Section1Component } from "../../pages/dashboard/section1.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { I18nModule } from '../../i18n/i18n.module';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatExpansionModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FontAwesomeModule,
    AngularFontAwesomeModule,
    I18nModule
  ],
  declarations: [
    DashboardComponent,
    Section1Component,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent
    // RtlComponent
  ],
  providers: []
})
export class AdminLayoutModule {}