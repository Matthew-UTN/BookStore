import { Component, OnInit } from '@angular/core';
import { DataapiService } from '../../services/dataapi.service';
import { BookInterface } from '../../models/book';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi: DataapiService) { }
  private books: BookInterface[];
  ngOnInit() {
    this.getOffers();
    console.log('OFERTAS', this.books);
  }


  getOffers() {
    this.dataApi.getAllBooksOffers().subscribe(offers => this.books = offers);
  }

}
