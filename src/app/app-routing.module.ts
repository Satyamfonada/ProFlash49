import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressbooksComponent } from './addressbooks/addressbooks.component';
import { CampaignsComponent } from './bulk-sms/campaigns/campaigns.component';
import { ExecutionsComponent } from './bulk-sms/executions/executions.component';
import { HttpApiComponent } from './bulk-sms/http-api/http-api.component';
import { ScheduledComponent } from './bulk-sms/scheduled/scheduled.component';
import { UrlManagementComponent } from './bulk-sms/url-management/url-management.component';
import { DashboardComponent } from './dashboard';
import { AuthGuard } from './_helpers';
import { ManageTemplateComponent } from './template-management/manage-template/manage-template.component';
import { RequestSenderComponent } from './sender-id-management/request-sender/request-sender.component';
import { MessageHistoryComponent } from './reporting/message-history/message-history.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SenderManagementComponent } from './admin/sender-management/sender-management.component';
import { RouteManagementComponent } from './admin/route-management/route-management.component';
import { FilterManagementComponent } from './admin/filter-management/filter-management.component';
import { MisToolReportingComponent } from './reporting/mis-tool-reporting/mis-tool-reporting.component';
import { ReportFormComponent } from './reporting/report-form/report-form.component';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'userBases', component: AddressbooksComponent, canActivate: [AuthGuard] },
    { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard] },
    { path: 'executions', component: ExecutionsComponent, canActivate: [AuthGuard] },
    { path: 'scheduled', component: ScheduledComponent, canActivate: [AuthGuard] },
    { path: 'http-api', component: HttpApiComponent, canActivate: [AuthGuard] },
    { path: 'url-management', component: UrlManagementComponent, canActivate: [AuthGuard] },
    { path: 'manage-template', component: ManageTemplateComponent, canActivate: [AuthGuard] },
    { path: 'request-sender', component: RequestSenderComponent, canActivate: [AuthGuard] },
    { path: 'message-history', component: MessageHistoryComponent, canActivate: [AuthGuard] },
    { path: 'mis-tool-reports', component: MisToolReportingComponent, canActivate: [AuthGuard] },
    { path: 'report-form', component: ReportFormComponent, canActivate: [AuthGuard] },
    { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
    { path: 'senders-management', component: SenderManagementComponent, canActivate: [AuthGuard] },
    { path: 'route-management', component: RouteManagementComponent, canActivate: [AuthGuard] },
    { path: 'filter-management', component: FilterManagementComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }