import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CollectionComponent } from './components/dashboard/collection/collection.component';
import { OverviewComponent } from './components/dashboard/collection/overview/overview.component';
import { ReportsComponent } from './components/dashboard/collection/reports/reports.component';
import { NewCollectionComponent } from './components/dashboard/collection/new-collection/new-collection.component';
import { ReportComponent } from './components/dashboard/collection/reports/report/report.component';
import { ReportResolver } from './resolvers/report.resolver';
import { ReportsResolver } from './resolvers/reports.resolver';
import { ReviewsResolver } from './resolvers/reviews.resolver';
import { NewReportComponent } from './components/dashboard/collection/reports/new-report/new-report.component';
import { CollectionResolver } from './resolvers/collection.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      {
        path: '',
        component: NewCollectionComponent
      },
      {
        path: 'new-collection',
        component: NewCollectionComponent
      },
      {
        path: 'collection/:collectionId',
        component: CollectionComponent,
        resolve: {
          collection: CollectionResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'reports', 
            pathMatch: 'full'
          },
          {
            path: 'overview',
            component: OverviewComponent,
            resolve: {
              reports: ReportsResolver
            }
          },
          {
            path: 'reports',
            component: ReportsComponent,
            resolve: {
              reports: ReportsResolver
            }
          },
          {
            path: 'new-report',
            component: NewReportComponent
          },
          {
            path: 'report/:reportId',
            component: ReportComponent,
            resolve: {
              report: ReportResolver,
              reviews: ReviewsResolver
            }
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
