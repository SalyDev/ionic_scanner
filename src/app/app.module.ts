import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { AppUiModule } from './app-ui.module';
import { AppComponent } from './app.component';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [AppComponent, FormatsDialogComponent, AppInfoDialogComponent],
  entryComponents: [],
  imports: [

    IonicModule.forRoot(), 
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
      // Angular
  
      // Local
BrowserModule,  
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
