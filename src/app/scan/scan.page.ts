import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { AppInfoDialogComponent } from '../app-info-dialog/app-info-dialog.component';
import { FormatsDialogComponent } from '../formats-dialog/formats-dialog.component';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage {

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(
    private router: Router,
    private readonly _dialog: MatDialog,
    private utilService: UtilService,
    private http: HttpClient
    )
     { }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;

    this.utilService.montantBehavior.subscribe(
      (montant)=>{

        console.log(montant)

        if(montant && montant!="" && montant!=0)
        {
           // on envoie le body
          const body = 
          {
            "client": "ZfAwWfuIPhI5bCjTTibJ",
            "marchand": "oT2YgidsRiKac0ccoxzb",
            "montant": montant
          }
          console.log(body);
          this.http.post('https://us-central1-fayyfepp-dev.cloudfunctions.net/paiements', body).subscribe({
            next(x) { console.log(x); },
            error(err) { console.error(err); },
            complete() { console.log('done'); }
           })
        }
      }
    )
   
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }



  getBack() {
    this.router.navigate([''])
  }


  // 
  sendCashIn(){
    this.utilService.montantBehavior.subscribe(
      (montant)=>{

        console.log(montant)

        if(montant && montant!="" && montant!=0)
        {
           // on envoie le body
          const body = 
          {
            "client": "ZfAwWfuIPhI5bCjTTibJ",
            "marchand": "oT2YgidsRiKac0ccoxzb",
            "montant": montant
          }
          console.log(body);
          this.http.post('https://us-central1-fayyfepp-dev.cloudfunctions.net/paiements', body).subscribe({
            next(x) { console.log(x); },
            error(err) { console.error(err); },
            complete() { console.log('done'); }
           })
        }
      }
    )
   
  }
}


