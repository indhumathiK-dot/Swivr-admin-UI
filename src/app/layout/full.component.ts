import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../service/user-service.service';
import {ISubscription} from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
public type: string = '';
  private isUserLoggedSubscription: ISubscription;

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
    this.isUserLoggedSubscription = this.userServiceService.headerNameUpdate.subscribe((isUserLogged: string) => {
      this.type = isUserLogged;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
    });
  }

  ngOnDestroy(): void {
  }
}
