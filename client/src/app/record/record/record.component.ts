import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Record} from "../Record";
import {RecordService} from "../record.service";
import {environment} from '../../../environments/environment'

@Component({
  selector: 'record',
  templateUrl: './record.component.html'
})

export class RecordComponent implements OnInit {
  @Input() record: Record;

  @ViewChild('audio') audioElement;


  constructor(private recordService: RecordService) {
  }

  ngOnInit(): void {
    this.audioElement.nativeElement.onplay = this.onPlay;

    if (this.record.file) {
      this.audioElement.src = `${environment.host}/api/files/${this.record.file.hash}`
    }
  }

  onPlay(): void {
    console.log('on play');
  }

}
