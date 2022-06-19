import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onDownloadResumeButtonClicked() {
    const path = '/assets/misc/dummy_resume.docx';
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', window.location.protocol + '//' + window.location.host + path);
    link.setAttribute('download', `dummy_resume.docx`);
    link.click();
    link.remove();
  }
}
