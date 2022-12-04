import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpDriver } from '../../shared/http-driver.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private renderer: Renderer2, private httpDriver: HttpDriver) { }

  ngOnInit(): void {
  }

  onDownloadResumeButtonClicked() {
    this.httpDriver.getResume();
  }
}
