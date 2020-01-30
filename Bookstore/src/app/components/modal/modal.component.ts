import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataapiService } from 'src/app/services/dataapi.service';
import { BookInterface } from '../../models/book';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataapiService) { }

  @ViewChild('XXXX',{static: true}) btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void{    
    if(bookForm.value.id==null){
      bookForm.value.userUid=this.userUid;
      this.dataApi.addBook(bookForm.value);
    }else{
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
