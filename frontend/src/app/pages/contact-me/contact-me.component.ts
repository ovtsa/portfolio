import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpDriver } from 'src/app/shared/http-driver.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  constructor(private renderer: Renderer2, private httpDriver: HttpDriver) { }

  ngOnInit(): void {
  }

  onDownloadResumeButtonClicked() {
    this.httpDriver.getResume();
  }
}
