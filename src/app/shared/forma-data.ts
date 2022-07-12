import { FormGroup } from "@angular/forms";

export class FormDataAppend {
    private formData = new FormData()

    createFormData(form: FormGroup, selectedPhoto: File) {
        this.formData.append('name', form.controls['name'].value);
        this.formData.append('email', form.controls['email'].value);
        this.formData.append('phone', form.controls['phone'].value);
        this.formData.append('position_id', form.controls['position_id'].value);
        this.formData.append('photo', selectedPhoto);

        return this.formData;
    }
}