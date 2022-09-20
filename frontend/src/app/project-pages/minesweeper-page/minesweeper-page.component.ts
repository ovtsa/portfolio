import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minesweeper-page',
  templateUrl: './minesweeper-page.component.html',
  styleUrls: ['./minesweeper-page.component.css']
})
export class MinesweeperPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onClick(event: Event) {
    console.log(event.timeStamp);
    this.http.post('https://portfolio-8b1ef-default-rtdb.firebaseio.com/posts.json', event.timeStamp)
      .subscribe(responseData => { console.log(responseData) });
  }
}
