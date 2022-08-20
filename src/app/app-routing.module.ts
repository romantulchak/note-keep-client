import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {AuthGuard} from "./guards/auth.guard";
import {MainComponent} from "./components/main/main.component";
import {NotesComponent} from "./components/main/notes/notes.component";

const routes: Routes = [
  {
    path: 'auth', canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ]
  },
  {
    path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'notes', pathMatch: 'full'},
      {path: 'notes', component: NotesComponent, data: {type: 'ALL'}},
      {path: 'label/:name', component: NotesComponent, data: {type: 'LABEL'}},
      {path: 'archive', component: NotesComponent, data: {type: 'ARCHIVE'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
