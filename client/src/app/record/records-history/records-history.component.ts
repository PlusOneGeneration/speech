import {Component, OnInit} from '@angular/core';
import {Record} from "../Record";
import {RecordService} from "../record.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'records-history',
  templateUrl: './records-history.component.html'
})
export class RecordsHistoryComponent implements OnInit {
  records: Record[] = [];
  selectedRecord: Record;

  constructor(private recordService: RecordService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.myRecords()
        .subscribe((records) => this.records = records);
  }

  showRecord(record: Record) {
    this.selectedRecord = record;
  }


}
