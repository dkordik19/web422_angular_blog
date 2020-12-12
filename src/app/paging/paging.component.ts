import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input() page: number;
  @Output() newPage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  previous(){
    if(this.page>1) this.newPage.emit(this.page-1); 
  }

  next(){
    this.newPage.emit(this.page+1);
  }
}
