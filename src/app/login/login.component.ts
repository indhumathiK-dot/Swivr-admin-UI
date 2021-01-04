import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userProfileImg: any;
  public errorClose: boolean | undefined;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    let offset = new Date().getTimezoneOffset();

    if (offset < 0) {
      let extraZero = '';
      if (-offset % 60 < 10)
        extraZero = '0';
      console.log( '+' + Math.ceil(offset / - 60) + ':' + extraZero + (-offset % 60));
    } else {
      let extraZero = '';
      if (offset % 60 < 10)
        extraZero = '0';

      console.log( '-' + Math.floor(offset / 60) + ':' + extraZero + (offset % 60));
    }
  }

  onSubmit() {
    if(!this.loginForm.value.username || !this.loginForm.value.password) {
      this.errorClose = true;
    } else {
      var data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
    }
  }
}
