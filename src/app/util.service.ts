import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  montantBehavior = new BehaviorSubject(null);
  marchandSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private db: AngularFirestore,
    private _router: Router,
    private _httpClient: HttpClient
  ){
      this.get("marchand", "oT2YgidsRiKac0ccoxzb").then(
        (marchand) => {
          this.marchandSubject.next(marchand)
        },
        (error)=> {
          console.log(error)
        }
      )

  }

  
  getList(colection: any, limit: any, sorter: any, filters?:any): AngularFirestoreCollection<any> {
    let finalFilters: any[] = [];
    let table = this.db.collection(colection);
    let collectionQuery;
    if (filters && filters.length > 0) {
      finalFilters = finalFilters.concat(filters);
    }
    if (finalFilters && finalFilters.length > 0) {
      let query = table.ref.orderBy(sorter.property, sorter.direction);
      finalFilters.forEach(filter => {
        if (filter.operator !== 'startAt') {
          query = query.where(filter.property, filter.operator, filter.value);
        }
        else {
          query = query.startAt(filter.value).endAt(filter.value + "\uf8ff")
        }

      });
      if (limit) {
        query = query.limit(limit);
      }
      collectionQuery = this.db.collection(colection, ref => query);
    }
    else if (limit) {
      let query = table.ref.orderBy(sorter.property, sorter.direction).limit(limit);
      collectionQuery = this.db.collection(colection, ref => query);
    }
    else if (sorter) {
      let query = table.ref.orderBy(sorter.property, sorter.direction);
      collectionQuery = this.db.collection(colection, ref => query);
    }
    else {
      collectionQuery = table;
    }
    return collectionQuery;
  }

  create(colection: any, document: any): Promise<any> {
    if (document.id) {
      return this.db.collection(colection).doc(document.id).set(document);
    }
    else {
      return this.db.collection(colection).add({ ...document });
    }
  }

  update(colection: any, key: string, value: any): Promise<void> {
    return this.db.collection(colection).doc(key).update(value);
  }

  delete(colection: any, key: string): Promise<void> {
    return this.db.collection(colection).doc(key).delete();
  }

  get(colection: any, key: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(colection).doc(key).get()
        .subscribe((snapshot) => {
          console.log('snapshot.data()', snapshot.data());
          resolve(snapshot.data())
        })
    });
  }
}