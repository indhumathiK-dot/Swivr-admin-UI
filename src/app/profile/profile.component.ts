import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userId: string | null | undefined;
  public vendorDetails: any;
  profileForm: FormGroup;
  isUpdate: boolean = false;
  public profileDetails: any;

  constructor(private fb: FormBuilder,
              private userServiceService: UserServiceService) {
    this.profileForm = this.fb.group({
      username: [],
      email: [],
      contact: [],
    });
  }
  ngOnInit(): void {
    this.profileView();
    this.userId = localStorage.getItem('userId');

  }

  profileView() {
    this.userServiceService.profileView().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.profileDetails = data.admin;
      }
    });
  }

  editUpdate(type: string) {
    this.isUpdate = type === 'edit';
  }
}
