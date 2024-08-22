import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: true }) signUpForm: NgForm;
  @ViewChild('email', { static: true }) emailVal: NgForm;
  defaultEML = "test@test.com"
  defaultQ = "pet";
  genders = ['male', 'female'];
  defaultGender = 'male';
  user = {
    username: '',
    email: '',
    secret: '',
    questionanswer: '',
    gender: '',
  };

  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionanswer: '',
    //   gender: 'male'
    // });
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // ngAfterContentChecked() {
  //   console.log(this.emailVal);
  // }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    //console.log(this.signUpForm);
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secret = this.signUpForm.value.secret;
    this.user.questionanswer = this.signUpForm.value.questionanswer;
    this.user.gender = this.signUpForm.value.gender;

    //resetting the value
    this.signUpForm.reset();
  }
}
