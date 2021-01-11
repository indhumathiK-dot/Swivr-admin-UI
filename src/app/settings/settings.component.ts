import {Component, OnInit, ViewChild,} from '@angular/core';
import {MatTabGroup} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServiceManagementService} from "../service/service-management.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
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
    this.columnTitle = ['ID', 'National Holiday', 'Action'];
    this.serviceForm = this.formBuilder.group({
      serviceName: [''],
      serviceImage: ['']
    });
  }


  public demo1TabIndex = 1;

  public demo1BtnClick() {
    const tabCount = 3;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
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


