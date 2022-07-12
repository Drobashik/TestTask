import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegExpression } from '../shared/reg-exp';
import { FormDataAppend } from '../shared/forma-data';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit, AfterContentInit {
  private mBytes5: number = 5000000

  private selectedPhoto: File;
  public bigSizeOfPhoto: boolean = false
  public photoName?: string = 'Upload your photo'
  
  constructor(private userService: UserService) { }
  
  
  form: FormGroup;
  regularExp = new RegExpression();

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.regularExp.emailPattern)]),
      phone: new FormControl('+380', [Validators.required, Validators.pattern(this.regularExp.phonePattern)]),
      position_id: new FormControl(1),
    })
  }
  
  ngAfterContentInit(): void {
    this.userService.getToken()
  }
  
  
  formDataCreate = new FormDataAppend();

  onSubmit() {
    const formData = this.formDataCreate.createFormData(this.form, this.selectedPhoto);
      this.userService.addUser(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

    uploadFile(event: Event) {
      this.bigSizeOfPhoto = false;
      const file = (<HTMLInputElement>event.target).files?.item(0);
      this.selectedPhoto = file as File;
      if(file!.size > this.mBytes5) {
        this.photoName = 'Upload your photo'
        this.bigSizeOfPhoto = true;
        return;
      }
      this.photoName = file?.name;
    }
  }

