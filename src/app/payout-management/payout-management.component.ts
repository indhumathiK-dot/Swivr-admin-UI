import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-payout-management',
  templateUrl: './payout-management.component.html',
  styleUrls: ['./payout-management.component.scss']
})
export class PayoutManagementComponent implements OnInit {

  public isUpdate = true;
  public payoutForm: FormGroup;
  public payoutDetails: any
  constructor(private fb: FormBuilder, private userServiceService: UserServiceService) { 
    this.payoutForm = this.fb.group({
      payout: '',
      isPayout: '',
      stripeName: '',
      publishableKey: '',
      secretkey: '',
    });
  }

  ngOnInit(): void {
    this.getPayoutDetails();
  }

  getPayoutDetails(){
    this.userServiceService.getPayoutDetails().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isUpdate = false;
        this.payoutDetails = data.data
        console.log(data);
      } else {
        this.payoutForm.reset();
        this.isUpdate = true;
      }
    });
  }

  onSubmit() {

    let data = {
      payout: this.payoutForm.value.payout,
      isPayout: this.payoutForm.value.isPayout,
      stripeName: this.payoutForm.value.stripeName,
      publicKey: this.payoutForm.value.publishableKey,
      privateKey: this.payoutForm.value.secretkey,
    }

    this.userServiceService.addUpdatePayout(data).subscribe((res: any) => {
      if(res.statusCode === 200){
        console.log(res);
        this.isUpdate = false;
        this.getPayoutDetails();
      } else {
        this.isUpdate = true;
      }

    });

  }

  editUpdate() {
    this.payoutForm.patchValue({
      payout: this.payoutDetails.payout,
      isPayout: this.payoutDetails.isPayout,
      stripeName: this.payoutDetails.stripeName,
      publishableKey: this.payoutDetails.publicKey,
      secretkey: this.payoutDetails.privateKey,
    });
    this.isUpdate = true;
  }

  cancel(){
    this.getPayoutDetails();
  }

  toggleButtonPayout(event: any){
    console.log(event);
    if(this.payoutDetails.isPayout){
      this.payoutForm.value.isPayout = false;
      this.payoutDetails.isPayout = false;
    } else {
      this.payoutForm.value.isPayout = true;
      this.payoutDetails.isPayout = true;
    }
  }

}
