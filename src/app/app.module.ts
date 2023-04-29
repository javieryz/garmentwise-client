import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FaqComponent } from './components/navbar/faq/faq.component';
import { AboutComponent } from './components/navbar/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { SentimentCardComponent } from './components/dashboard/collection/reports/report/sentiment-card/sentiment-card.component';
import { ReviewsComponent } from './components/dashboard/collection/reports/report/reviews/reviews.component';
import { WordcloudComponent } from './components/dashboard/collection/reports/report/wordcloud/wordcloud.component';
import { ReportComponent } from './components/dashboard/collection/reports/report/report.component';
import { HowItWorksComponent } from './components/home/how-it-works/how-it-works.component';
import { NewCollectionComponent } from './components/dashboard/collection/new-collection/new-collection.component';
import { CollectionComponent } from './components/dashboard/collection/collection.component';
import { CollectionNavbarComponent } from './components/dashboard/collection/collection-navbar/collection-navbar.component';
import { OverviewComponent } from './components/dashboard/collection/overview/overview.component';
import { ReportsComponent } from './components/dashboard/collection/reports/reports.component';
import { DatePipe } from '@angular/common';
import { NewReportComponent } from './components/dashboard/collection/reports/new-report/new-report.component';
import { NgChartsModule } from 'ng2-charts';
import { ScoreChartComponent } from './components/dashboard/collection/overview/score-chart/score-chart.component';
import { OverviewSentimentCardComponent } from './components/dashboard/collection/overview/overview-sentiment-card/overview-sentiment-card.component';
import { BarChartComponent } from './components/dashboard/collection/overview/bar-chart/bar-chart.component';
import { RouteReuseStrategy } from '@angular/router';
import { OverviewRouteReuseStrategy } from './route-strategy/custom-route-reuse-strategy';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FaqComponent,
    AboutComponent,
    DashboardComponent,
    SidebarComponent,
    SentimentCardComponent,
    ReviewsComponent,
    WordcloudComponent,
    ReportComponent,
    HowItWorksComponent,
    CollectionComponent,
    NewCollectionComponent,
    CollectionNavbarComponent,
    OverviewComponent,
    ReportsComponent,
    NewReportComponent,
    ScoreChartComponent,
    OverviewSentimentCardComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [
    { provide: DatePipe, useValue: new DatePipe('en-US') },
    { provide: RouteReuseStrategy, useClass: OverviewRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
