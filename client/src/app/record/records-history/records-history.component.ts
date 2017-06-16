import {Component, OnInit, ViewChild} from '@angular/core';
import {Record} from "../Record";
import {RecordService} from "../record.service";
import {UserService} from "../../user/user.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'records-history',
  templateUrl: './records-history.component.html'
})
export class RecordsHistoryComponent implements OnInit {
  records: Record[] = [];
  totalRecords: number;
  selectedRecord: Record;
  page: number;
  totalPages: number;
  recordsPerPage: number = 10;
  pagesArray: any[];
  loading: boolean = false;
  moment:any = moment;

  @ViewChild('target') scrollTarget;

  constructor(private recordService: RecordService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.route.params
      .subscribe((params) => {
        this.page = params.page || 1

        this.userService.user$
          .subscribe((user) => {
            this.userService.getTotalUserRecords(user)
              .subscribe((recordsNumber) => {
                this.totalPages = Math.ceil(recordsNumber.total / this.recordsPerPage);
                this.pagesArray = new Array(this.totalPages);
              });

            this.userService.getUserRecords(user, this.recordsPerPage, (this.page - 1) * this.recordsPerPage)
              .subscribe((records) => {
                this.scrollTarget.nativeElement.scrollIntoView();
                this.records = records;
                this.loading = false;
              });
          });
      });
  }

  showRecord(record: Record) {
    this.selectedRecord = record;
  }


}
