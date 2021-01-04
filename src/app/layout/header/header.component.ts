import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userProfileImg: string | undefined;
  public fullname: string | null = '';
  private userId: string | null | undefined;

  constructor(private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userProfileImg = localStorage.getItem('image') && localStorage.getItem('image') !== 'undefined' ? environment.image_url + localStorage.getItem('image') : '';
    this.userId = localStorage.getItem('userId');
    this.fullname = localStorage.getItem('fullname');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  ngOnDestroy() {
  }
}
