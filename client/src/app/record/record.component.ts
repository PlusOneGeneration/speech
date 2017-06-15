import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'record',
  templateUrl: './record.component.html'
})

export class RecordComponent implements OnInit{
  title = 'Record works!';
  // constructor(private recordService: RecordService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  //   this.route.data
  //   .map((data: { record: Record }) => data.record)
  //   .subscribe((record: Record) => console.log(record));
  }

}
