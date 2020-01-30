import { Component, OnInit } from '@angular/core';
import { DataapiService } from '../../services/dataapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataapiService) { }

  public books = [];
  public book = '';
  ngOnInit() {
    this.dataApi.getAllBooks().subscribe(books=>{
      console.log('books',books);
      this.books = books;
    })
  }

}
