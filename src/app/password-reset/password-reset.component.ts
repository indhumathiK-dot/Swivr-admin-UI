import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  passwordCheck = false;

  constructor(private fb: FormBuilder,
              private userServiceService: UserServiceService) {
    this.userServiceService.headerNameUpdate.next('Profile');
    this.resetForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required, this.MustMatch('password', 'confirmPassword')]
    });
  }

  ngOnInit() {
  }


// custom validator to check that two fields match
  private MustMatch(controlName: string, matchingControlName: string) {
    return (resetForm: FormGroup) => {
      const control = this.resetForm.controls[controlName];
      const matchingControl = this.resetForm.controls[matchingControlName];

      // set error on matchingControl if validation fails

      if (this.passwordCheck) {
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    let confirmPass = this.resetForm.controls['confirmPassword'].value;
    if (!this.resetForm.value.password || !confirmPass || this.resetForm.value.password !== confirmPass) {

      if (!this.resetForm.value.password || !confirmPass ) {
        this.resetForm.controls.confirmPassword.setErrors({ mustMatch: true });
      } else if (this.resetForm.controls.password.value !== confirmPass) {
        this.resetForm.controls.confirmPassword.setErrors({ mustMatch: true });
      } else {
        this.resetForm.controls.confirmPassword.setErrors(null);
      }
      this.passwordCheck = true;
      return;
    } else {

      this.passwordCheck = false;
      let data = {
        oldPassword: this.resetForm.value.oldPassword,
        password: this.resetForm.value.password
      };
      this.userServiceService.resetPassword(data).subscribe((data: any) => {
        if (data.statusCode === 200) {
          console.log('done');
        }
      });
    }
  }

}
