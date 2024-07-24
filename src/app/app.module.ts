import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { AddressbooksComponent } from './addressbooks/addressbooks.component';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RepositoryDialogComponent } from './addressbooks/repository-dialog/repository-dialog.component';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ManageAddressBookDialogComponent } from './addressbooks/manage-address-book-dialog/manage-address-book-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { UploadUserBaseDialogComponent } from './addressbooks/upload-user-base-dialog/upload-user-base-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewEntryDialogComponent } from './addressbooks/new-entry-dialog/new-entry-dialog.component';
import { CampaignsComponent } from './bulk-sms/campaigns/campaigns.component';
import { ExecutionsComponent } from './bulk-sms/executions/executions.component';
import { SimpleBroadcastDialogComponent } from './bulk-sms/campaigns/simple-broadcast-dialog/simple-broadcast-dialog.component';
import { DynamicBroadcastDialogComponent } from './bulk-sms/campaigns/dynamic-broadcast-dialog/dynamic-broadcast-dialog.component';
import { SelectAddressBookDialogComponent } from './bulk-sms/campaigns/select-address-book-dialog/select-address-book-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScheduledComponent } from './bulk-sms/scheduled/scheduled.component';
import { HttpApiComponent } from './bulk-sms/http-api/http-api.component';
import { UrlManagementComponent } from './bulk-sms/url-management/url-management.component';
import { UrlDialogComponent } from './bulk-sms/url-management/url-dialog/url-dialog.component';
import { MessagePreviewDialogComponent } from './bulk-sms/campaigns/message-preview-dialog/message-preview-dialog.component';
import { ManageTemplateComponent } from './template-management/manage-template/manage-template.component';
import { CreateTemplateDialogComponent } from './template-management/create-template-dialog/create-template-dialog.component';
import { RequestSenderComponent } from './sender-id-management/request-sender/request-sender.component';
import { RequestSenderDialogComponent } from './sender-id-management/request-sender-dialog/request-sender-dialog.component';
import { MessageHistoryComponent } from './reporting/message-history/message-history.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActionButtonsComponent } from './shared/action-buttons/action-buttons.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CreateUserDialogComponent } from './admin/create-user-dialog/create-user-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { ResetPasswordDialogComponent } from './admin/reset-password-dialog/reset-password-dialog.component';
import { SenderManagementComponent } from './admin/sender-management/sender-management.component';
import { CreateNewSenderDialogComponent } from './admin/create-new-sender-dialog/create-new-sender-dialog.component';
import { UploadSenderSheetDialogComponent } from './admin/upload-sender-sheet-dialog/upload-sender-sheet-dialog.component';
import { RouteManagementComponent } from './admin/route-management/route-management.component';
import { CreateNewRouteDialogComponent } from './admin/create-new-route-dialog/create-new-route-dialog.component';
import { SomethingWentWrongComponent } from './something-went-wrong/something-went-wrong.component';
import { ManageSelectorDialogComponent } from './admin/manage-selector-dialog/manage-selector-dialog.component';
import { ControlRoutesDialogComponent } from './admin/control-routes-dialog/control-routes-dialog.component';
import { FilterManagementComponent } from './admin/filter-management/filter-management.component';
import { CreateNewFilterDialogComponent } from './admin/create-new-filter-dialog/create-new-filter-dialog.component';
import { AddPropertyDialogComponent } from './admin/add-property-dialog/add-property-dialog.component';
import { SettingsActionDialogComponent } from './admin/settings-action-dialog/settings-action-dialog.component';
import { MisToolReportingComponent } from './reporting/mis-tool-reporting/mis-tool-reporting.component';
import { ReportFormComponent } from './reporting/report-form/report-form.component';
import { DatetimepickerComponent } from './bulk-sms/campaigns/datetimepicker/datetimepicker.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        NgChartsModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSortModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatCardModule,
        MatMenuModule,
        MatRadioModule,
        MatSliderModule,
        MatSlideToggleModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        TopNavigationComponent,
        SideNavigationComponent,
        AddressbooksComponent,
        RepositoryDialogComponent,
        ManageAddressBookDialogComponent,
        UploadUserBaseDialogComponent,
        NewEntryDialogComponent,
        CampaignsComponent,
        ExecutionsComponent,
        SimpleBroadcastDialogComponent,
        DynamicBroadcastDialogComponent,
        SelectAddressBookDialogComponent,
        ScheduledComponent,
        HttpApiComponent,
        UrlManagementComponent,
        UrlDialogComponent,
        MessagePreviewDialogComponent,
        ManageTemplateComponent,
        CreateTemplateDialogComponent,
        RequestSenderComponent,
        RequestSenderDialogComponent,
        MessageHistoryComponent,
        ActionButtonsComponent,
        UserManagementComponent,
        CreateUserDialogComponent,
        ResetPasswordDialogComponent,
        SenderManagementComponent,
        CreateNewSenderDialogComponent,
        UploadSenderSheetDialogComponent,
        RouteManagementComponent,
        CreateNewRouteDialogComponent,
        SomethingWentWrongComponent,
        ManageSelectorDialogComponent,
        ControlRoutesDialogComponent,
        FilterManagementComponent,
        CreateNewFilterDialogComponent,
        AddPropertyDialogComponent,
        SettingsActionDialogComponent,
        MisToolReportingComponent,
        ReportFormComponent,
        DatetimepickerComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { };