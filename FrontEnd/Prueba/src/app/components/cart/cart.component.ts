import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { Product } from 'src/app/models/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { KushkiService } from 'src/app/core/services/kushki.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  payButton = false;
  imageSource='../../../assets/images/Logo Kushki - Oscuro.svg'

  displayedColumns: string[] = ['item', 'cost'];
  dataSource: Product[]  = [];
  years: string[] = [];
  months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  currentTime = new Date();
  total = 0;
  dateError = false;
  formGroup!: FormGroup;

  constructor(
    private listSrv: StateService,
    public kushkiSrv: KushkiService,
    private _formBuilder: FormBuilder,
    
  ) { 
    let anio = this.currentTime.getFullYear() ;
    for(let i=0; i < 11 ; i++){
      let year = anio + i;
      let anioString = year.toString().substr(-2);
      this.years.push(anioString);
    }
  }

  ngOnInit(): void {
    this.getItemList();


    this.formGroup = this._formBuilder.group({
      prop:    ['',    Validators.required],
      cvv:     [ '' , [Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(4),
                            Validators.pattern('^[0-9]+$')]],
      card:    [ '' , [Validators.required,
                            Validators.minLength(16),
                            Validators.maxLength(16),
                            Validators.pattern('^[0-9]+$')]],
      month:     [ null , [Validators.required]],
      year:     [ null , [Validators.required]],
    });
  }


  getItemList(){
    this.dataSource = this.listSrv.returnArtList();
    this.total = this.dataSource.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  

  validateDate(slctdYear: string, slctdMonth: string ){
    let currYear = Number(this.currentTime.getFullYear().toString().substr(-2));
    let currMonth = this.currentTime.getMonth() +1;
    if( currYear === Number(slctdYear) && currMonth >= Number(slctdMonth) ) {
      this.dateError = true
    }else{
      this.dateError = false
    }

    
    
  }

  requestKushki(){
    this.validateDate(this.formGroup.value.year, this.formGroup.value.month);
    if( !this.dateError  ){
    
      this.kushkiSrv.requestKushki(this.formGroup?.value, this.total, this.dataSource);
    }
    
   
    
  }

}
