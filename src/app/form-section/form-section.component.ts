import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegExpretion } from '../reg-exp/reg-exp';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit, AfterContentInit {

  constructor(private userService: UserService) { }

  regularExp = new RegExpretion();
  form: FormGroup;
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.regularExp.emailPattern)]),
      phone: new FormControl('+380', [Validators.required, Validators.pattern(this.regularExp.phonePattern)]),
      position_id: new FormControl(1),
      photo: new FormControl('')
    })
  }

  ngAfterContentInit(): void {
    this.userService.getToken()
  }


  onSubmit() {
    console.log(this.form.value);
      this.userService.addUser(this.form.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

