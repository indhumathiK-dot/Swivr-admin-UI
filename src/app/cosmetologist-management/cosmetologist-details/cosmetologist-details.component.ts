import { Component, OnInit } from '@angular/core';
import {CosmetologistServiceService} from '../../service/cosmetologist-service.service';
import {ActivatedRoute} from '@angular/router';
import { TreeNode} from 'primeng/api/treenode';
import {UserServiceService} from '../../service/user-service.service';

@Component({
  selector: 'app-cosmetologist-details',
  templateUrl: './cosmetologist-details.component.html',
  styleUrls: ['./cosmetologist-details.component.scss']
})
export class CosmetologistDetailsComponent implements OnInit {
  private userKey: string | undefined;
  public cosmetologistDetails: any;
  public shopDetails: any;
  appointmentList: TreeNode[]  = [];
  selectedPortfolio: TreeNode | undefined;
  public appointmentCount: number = 0;
  private start: number = 0;
  private limit: number = 10;

  constructor(private cosmetologistServiceService: CosmetologistServiceService,
              private route: ActivatedRoute,
              private userServiceService: UserServiceService) {
    this.userServiceService.headerNameUpdate.next('Cosmetologist Management');
    this.route.params.subscribe(params => {
      this.userKey = params['id'];
    });
  }

  ngOnInit(): void {
    this.getCosmetologistDetails();
    this.getAppointmentDetails(10, 0);
  }

  getCosmetologistDetails() {

    this.cosmetologistServiceService.cosmetologistDetails(this.userKey).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.cosmetologistDetails = data.data.cosmetologist;
        this.shopDetails = data.data.shopDetails;
      }
    });
  }

  getAppointmentDetails(limit: number, start: number) {

    this.cosmetologistServiceService.getAppointmentList(this.userKey, 'USER', start, limit).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.appointmentList = this.appointmentList.concat(data.list);
        // this.appointmentList = data.list;
        this.appointmentCount = data.count;
      }
    });
  }


  toggleNode(node: any){
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
