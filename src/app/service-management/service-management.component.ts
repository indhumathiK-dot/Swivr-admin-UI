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
  servicesList: any;
  serviceForm: FormGroup;
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];
  serviceText: string | undefined;
  public isUpdate: boolean = false;
  private serviceId: any;

  constructor(public formBuilder: FormBuilder,
              public serviceManagementService: ServiceManagementService) {
    this.columnTitle = ['Service Image', 'Service Name', 'Action'];
    this.serviceForm = this.formBuilder.group({
      serviceName: [''],
      serviceImage: ['']
    });
  }

  ngOnInit() {
    this.serviceText = 'Create Service';
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
        this.servicesList = data.list;
        console.log(this.servicesList)
        this.dataSource.data = data.list;
        this.rowCount = data.list.length;
      }
    });
  }

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

  serviceDelete(serviceId: number) {
    this.serviceManagementService.serviceDelete(serviceId).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.getServiceList(0, 0);
      }
    });
  }
}
