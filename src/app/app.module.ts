import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {MainComponent} from './components/main/main.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import {TopNavbarComponent} from './components/navbar/top-navbar/top-navbar.component';
import {LeftNavbarComponent} from './components/navbar/left-navbar/left-navbar.component';
import {NotesComponent} from './components/main/notes/notes.component';
import {CreateNoteComponent} from './components/main/notes/create-note/create-note.component';
import {
  NoteBackgroundPickerComponent
} from './components/main/notes/note-background-picker/note-background-picker.component';
import {NoteToolbarComponent} from './components/main/notes/note-toolbar/note-toolbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {CreateLabelComponent} from './components/dialogs/create-label/create-label.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from "@angular/flex-layout";
import {NoteCardComponent} from './components/main/notes/note-card/note-card.component';
import {NoteDetailsDialogComponent} from './components/main/notes/note-details-dialog/note-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    TopNavbarComponent,
    LeftNavbarComponent,
    NotesComponent,
    CreateNoteComponent,
    NoteBackgroundPickerComponent,
    NoteToolbarComponent,
    CreateLabelComponent,
    NoteCardComponent,
    NoteDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    DragDropModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
