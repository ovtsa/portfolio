import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onDownloadResumeButtonClicked() {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'http://localhost:4200/assets/misc/dummy_resume.docx');
    link.setAttribute('download', `dummy_resume.docx`);
    link.click();
    link.remove();
  }
}
