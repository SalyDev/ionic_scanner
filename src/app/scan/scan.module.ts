import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPageRoutingModule } from './scan-routing.module';

import { ScanPage } from './scan.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppUiModule } from '../app-ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ScanPageRoutingModule,
    ZXingScannerModule,
    AppUiModule,
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
