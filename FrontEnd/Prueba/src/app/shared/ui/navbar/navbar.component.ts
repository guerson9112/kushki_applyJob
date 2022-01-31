import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  totalList = 0;

  constructor(
    private listaSrv: StateService,
  ) { }

  ngOnInit(): void {

    this.getListado();

  }


  getListado(){


    this.listaSrv.artLists$.subscribe( (r: Product[]) => {
      this.totalList = r.length;
    }  )

  }


}
