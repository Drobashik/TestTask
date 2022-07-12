import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-task';
  userId: number;

  
  ngOnInit() {
  }

  getId(id: number) {
    this.userId = id;
    this.returnId()
  }

  returnId() {
    return this.userId
  }
}
