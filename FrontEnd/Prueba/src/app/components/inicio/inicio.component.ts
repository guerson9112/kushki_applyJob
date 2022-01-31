import { Component, OnInit } from '@angular/core';
import  swal from 'sweetalert2';

import { MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/ui/dialog/dialog.component';
import { StateService } from 'src/app/core/services/state.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';
import { KushkiService } from 'src/app/core/services/kushki.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  arts: Product[] = [];

  idCharacters: number[] = [];// id de personajes a buscar

  constructor(

    private stateSrv: StateService,
    private productSrv: ProductService,
    public dialog: MatDialog,
    private kushkiSrv: KushkiService

  ) { }

  ngOnInit(): void {

    this.kushkiSrv.successTransction = false;
    this.kushkiSrv.token = null;
    this.kushkiSrv.errorTransction = false;
    this.kushkiSrv.code = null;
    this.stateSrv.setArtList([]);
    this.listArt();
  }

  listArt(){

    let artList: Product[] = [];

    try {

      this.productSrv.readLocalJson().subscribe( r => {

        this.arts = r.obras;


      } );
      
    } catch (error) {

      console.error(error);
      swal.fire('Error', 'Hubo un problema consultando el servicio', 'error')
      
    }
    
  }

  

  addToCart(art: Product){
    let artList = this.stateSrv.returnArtList();
    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      
      if ( result ){
        
        
          
          artList.push(art);
          this.stateSrv.setArtList(artList);
          let buscarIndex = this.arts.findIndex(  x => (x.id === art.id) );
          this.arts.splice(buscarIndex, 1) 
          
        

      }

    });
  }


  

}
