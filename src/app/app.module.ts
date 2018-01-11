import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoundsComponent } from './components/rounds/rounds.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { JobService } from './services/job.service';
import { JobListResolverService } from './services/job-list-resolver.service';
import { RoundService } from './services/round.service';
import { RoundListResolverService } from './services/round-list-resolver.service';
import { QuestionService } from './services/question.service';
import { AuthService } from './shared/services/auth.service';
import { QuestionListResolverService } from './services/question-list-resolver.service';
import { SubmitDialogComponent } from './components/submit-dialog/submit-dialog.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { NavbarService } from './shared/services/navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent,
    DashboardComponent,
    RoundsComponent,
    QuestionsComponent,
    SubmitDialogComponent
  ],
  entryComponents: [SubmitDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    AuthService,
    JobService,
    JobListResolverService,
    RoundService,
    RoundListResolverService,
    QuestionService,
    QuestionListResolverService,
    LoginGuard,
    AuthGuard,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
