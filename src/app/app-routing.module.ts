import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoundsComponent } from './components/rounds/rounds.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { LoginComponent } from './shared/components/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { JobListResolverService } from './services/job-list-resolver.service';
import { RoundListResolverService } from './services/round-list-resolver.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {jobs: JobListResolverService}
  },
  {
    path: 'rounds/:id',
    component: RoundsComponent,
    resolve: {rounds: RoundListResolverService}
  },
  {
    path: 'questions/:id',
    component: QuestionsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'page-not-found-404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found-404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
