import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Record} from "../Record";

@Component({
  selector: 'record',
  templateUrl: './record.component.html'
})

export class RecordComponent implements OnInit, OnChanges{
  @Input() record: Record;

  @ViewChild('audio') audioElement;


  // constructor(private recordService: RecordService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  //   this.route.data
  //   .map((data: { record: Record }) => data.record)
  //   .subscribe((record: Record) => console.log(record));
  }

  ngOnChanges(changes: any) {
    console.log(changes.record.currentValue);
  }

}
