import { Component, OnInit } from '@angular/core';
import { Email } from '../../models/email';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formData) {
    console.log(formData);
  }
}
