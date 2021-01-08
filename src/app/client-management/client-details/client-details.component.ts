import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api/treenode';
import {CosmetologistServiceService} from '../../service/cosmetologist-service.service';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../../service/user-service.service';
import {ClientServiceService} from '../../service/client-service.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  private custKey: string | undefined;
  public clientDetails: any;
  appointmentList: TreeNode[] = [];
  selectedPortfolio: TreeNode | undefined;
  public appointmentCount: number = 0;
  private start: number = 0;
  private limit: number = 10;

  constructor(private clientServiceService: ClientServiceService,
              private route: ActivatedRoute,
              private userServiceService: UserServiceService) {
    this.userServiceService.headerNameUpdate.next('Client Management');
    this.route.params.subscribe(params => {
      this.custKey = params['id'];
    });
  }

  ngOnInit(): void {
    this.getClientDetails();
    this.getAppointmentDetails(10, 0);
  }

  getClientDetails() {
    this.clientServiceService.clientDetails(this.custKey).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.clientDetails = data.customer;
      }
    });
  }

  getAppointmentDetails(limit: number, start: number) {

    this.clientServiceService.getAppointmentList(this.custKey, 'CUSTOMER', start, limit).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.appointmentList = this.appointmentList.concat(data.list);
        // this.appointmentList = data.list;
        this.appointmentCount = data.count;
        console.log(this.appointmentList)
      }
    });
  }


  toggleNode(node: any) {
    node.visible = !node.visible;
    // @ts-ignore
    this.appointmentList = [...this.appointmentList];
  }

  onScroll() {
    this.start = this.start + 1;
    this.getAppointmentDetails(this.limit, ((this.start * this.limit) + 1));
  }

  counter(i: number) {
    return new Array(i);
  }
}
