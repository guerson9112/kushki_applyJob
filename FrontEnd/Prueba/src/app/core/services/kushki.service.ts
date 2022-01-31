import { Injectable } from '@angular/core';
import { Kushki } from '@kushki/js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Product } from 'src/app/models/product';
@Injectable({
  providedIn: 'root'
})
export class KushkiService {


  public loading = false;
  public token = null;
  public errorTransction = false;
  public successTransction = false;
  public code = null
  public successData = '';
  kushki = new Kushki({
    merchantId: environment.publicMerchantId, 
    inTestEnvironment: true,
  });


  constructor(private http: HttpClient) { }


  requestKushki(chargeData: any, total: number, products: Product[]) {

    this.loading = true;

    this.kushki.requestToken({
      amount: String(total),
      currency: "USD",
      card: {
        name: chargeData.prop,
        number: String(chargeData.card),
        cvc: chargeData.cvv,
        expiryMonth: chargeData.month,
        expiryYear: chargeData.year,
      },
    }, (response: any) => {

      if (response.token) {
        this.sendToken(response.token, total, products);
        this.token = response.token;

      } else {
        this.code = response.code;
        this.errorTransction = true;
        this.loading = false;
      }
    });



  }

  sendToken(token: string, total: number, products: Product[]) {
    
      let prods: Product[] = [];
      products.forEach( p => {
        prods.push({
          id: p.id,
          title: p.title,
          price: p.price,
          sku: p.sku,
          quantity: p.quantity
        })
      } )

      this.http.post<any>(`${environment.backendUrl}/api/token`, {
        token,
        products: prods,
        subtotalIva0: total,

      }).subscribe(response => {
        if (response.ok) {

          swal.fire('', 'Transacción exitosa', 'success');
          this.successTransction = true;
          this.successData = JSON.stringify( response.data);
          this.loading = false;
        } else {
          this.errorTransction = true;
          this.loading = false;
        }
      },err => {
        this.errorTransction = true;
        this.loading = false;
      })


    

  }
}
