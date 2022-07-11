import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {

  constructor() { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      position: new FormControl('Frontend developer'),
      photo: new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
