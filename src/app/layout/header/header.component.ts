import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userProfileImg: string | null | undefined;
  public fullname: string | null = '';

  constructor(private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userProfileImg = localStorage.getItem('adminProfile');
    this.fullname = localStorage.getItem('fullName');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  ngOnDestroy() {
  }
}
