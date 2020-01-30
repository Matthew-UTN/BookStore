import { Component, OnInit } from '@angular/core';
import { DataapiService } from '../../../services/dataapi.service';
import { BookInterface } from '../../../models/book';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataapiService, private authService: AuthService) { }
  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth=>{
      if(auth){
        this.userUid=auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole=>{
          this.isAdmin= Object.assign({},userRole.roles).hasOwnProperty('admin');

        })
      }
    })
  }

  getListBooks() {
    this.dataApi.getAllBooks().subscribe(books => {
     this.books = books;
    });
  }

  onDeleteBook(idBook: string){
    const confirmation = confirm("are you sure you want to delete this book?");
    if(confirmation){
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface){
    console.log(book);
    this.dataApi.selectedBook= Object.assign({}, book);
  }

}
