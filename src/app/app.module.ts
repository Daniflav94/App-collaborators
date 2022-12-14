import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

import {environment} from 'src/environments/environment';
import { LoginComponent } from './views/login/login.component';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './views/home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './shared/material/material.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EditarColaboradorComponent } from './views/editar-colaborador/editar-colaborador.component';
import { NovoColaboradorComponent } from './views/novo-colaborador/novo-colaborador.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarUsuarioComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    NovoColaboradorComponent,
    EditarColaboradorComponent,
    DetalhesComponent,
    AvatarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
