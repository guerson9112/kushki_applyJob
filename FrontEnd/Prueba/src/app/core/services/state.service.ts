import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product';



const artList: Product[] = [];




@Injectable({
  providedIn: 'root'
})
export class StateService {

  private artListSubject = new BehaviorSubject<Product[]>(artList);

  artLists$: Observable<any>

  constructor(

   

  ) { 

   this.artLists$ = this.artListSubject.asObservable();

  }



  public setArtList(arts: Product[]){

    this.artListSubject.next(arts)

  }



  public returnArtList(){
    return this.artListSubject.value
  }



}
