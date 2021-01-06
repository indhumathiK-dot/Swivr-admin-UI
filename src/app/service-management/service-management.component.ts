import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ServiceManagementService} from '../service/service-management.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit {
  dataSource = new MatTableDataSource();
  serviceForm: FormGroup;
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];
  orderString: string | undefined;
  serviceText: string | undefined;
  showError: boolean = false;
  public isUpdate: boolean = false;
  private serviceId: any;

  constructor(public formBuilder: FormBuilder,
              public serviceManagementService: ServiceManagementService) {
    this.columnTitle = ['Service Image', 'Service Name', 'Action'];
    this.serviceForm = this.formBuilder.group({
      serviceName: [''],
      serviceImage: ['']
    });
    // this.dataSource.data = [
    //   { url: 'https://swivr-dev.s3.us-east-2.amazonaws.com/customer/image-f037f40a-ec11-4a8b-abce-ba997260ed18.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4GG3GNFSZGKCSXRI%2F20210104%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210104T130759Z&X-Amz-Expires=3600&X-Amz-Signature=48f0922bb49c36e9132ea93fdddebcecb3fb2e9b3fb1eb6e66e8cbb866246720&X-Amz-SignedHeaders=host', name: 'Haircut' },
    //   { url: 'https://swivr-dev.s3.us-east-2.amazonaws.com/customer/image-f037f40a-ec11-4a8b-abce-ba997260ed18.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4GG3GNFSZGKCSXRI%2F20210104%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210104T130759Z&X-Amz-Expires=3600&X-Amz-Signature=48f0922bb49c36e9132ea93fdddebcecb3fb2e9b3fb1eb6e66e8cbb866246720&X-Amz-SignedHeaders=host', name: 'Facial' },
    //   { url: 'https://swivr-dev.s3.us-east-2.amazonaws.com/customer/image-f037f40a-ec11-4a8b-abce-ba997260ed18.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4GG3GNFSZGKCSXRI%2F20210104%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210104T130759Z&X-Amz-Expires=3600&X-Amz-Signature=48f0922bb49c36e9132ea93fdddebcecb3fb2e9b3fb1eb6e66e8cbb866246720&X-Amz-SignedHeaders=host', name: 'Menicure' }
    //   ];
  }

  ngOnInit() {
    this.serviceText='Create Service';
    this.getServiceList(0, 0);
  }

  getServiceList(count = 0, previousPageIndex = 0) {

    if (count === 0) {
      if (count <= previousPageIndex) {
        this.start = 0;
      } else {
        this.start += this.pageSize;
      }
    } else {
      this.start = count * this.pageSize;
    }
    let filter = {
      limit: this.limit,
      start: this.start,
      search: '',
    };

    this.serviceManagementService.serviceList().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.dataSource.data = data.list;
        this.rowCount = data.list.length;
      }
    });
  }

  // search(searchValue) {
  //   this.showResultLabel = true;
  //   this.searchValue = searchValue;
  //   this.paginator.pageIndex = 0;
  //   this.getRoles(0,0);
  //   this.toResult = true;
  // }


  onChange(event: any) {
    this.event = event.pageIndex;
    if (this.limit !== event.pageSize) {
      this.start -= event.pageSize;
      this.limit = event.pageSize;
      this.pageSize = event.pageSize;
    }
    this.prevPageIndex = event.previousPageIndex;
    this.getServiceList(event.pageIndex, event.previousPageIndex);
  }

  addUpdateService() {
    if (this.isUpdate) {
      let data = {
        id: this.serviceId,
        serviceName: this.serviceForm.value.serviceName
      };
      this.serviceManagementService.serviceUpdate(data).subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.serviceText = 'Create Service';
          this.serviceForm.reset();
          this.getServiceList(0, 0);
        }
      });
    } else {
      let data = {
        serviceName: this.serviceForm.value.serviceName
      };
      this.serviceManagementService.serviceAdd(data).subscribe((data: any) => {
        if (data.statusCode === 201) {
          this.serviceText = 'Create Service';
          this.serviceForm.reset();
          this.getServiceList(0, 0);
        }
      });
    }

  }


  cancel() {
    this.serviceText = 'Create Service';
    this.serviceId = 0;
    this.isUpdate = false;
    this.serviceForm.reset();
  }

  editUpdate(data: any) {
    this.serviceText = 'Update Service';
    this.serviceId = data.id;
    this.isUpdate = true;
    this.serviceForm.patchValue( {
      serviceName: data.serviceName
    });

  }
}
