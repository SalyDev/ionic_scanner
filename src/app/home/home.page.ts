import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  montant: FormControl = new FormControl();

  constructor(private utilService: UtilService) { }

  ngOnInit() {
  }

  scanQr(){
    this.utilService.montantBehavior.next(this.montant.value);
  }

}
