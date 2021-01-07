import { Component, OnInit } from '@angular/core';
import {CosmetologistServiceService} from '../../service/cosmetologist-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cosmetologist-details',
  templateUrl: './cosmetologist-details.component.html',
  styleUrls: ['./cosmetologist-details.component.scss']
})
export class CosmetologistDetailsComponent implements OnInit {
  private userKey: string | undefined;
  public cosmetologistDetails: any;
  public shopDetails: any;

  constructor(private cosmetologistServiceService: CosmetologistServiceService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userKey = params['id'];
    });
  }

  ngOnInit(): void {
    this.getCosmetologistDetails();
  }

  getCosmetologistDetails() {

    this.cosmetologistServiceService.cosmetologistDetails(this.userKey).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.cosmetologistDetails = data.data.cosmetologist;
        this.shopDetails = data.data.shopDetails;
      }
    });
  }
}
