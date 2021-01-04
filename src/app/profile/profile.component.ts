import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userId: string | null | undefined;
  public vendorDetails: any;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: [],
      confirmPassword: [],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

  }
}
