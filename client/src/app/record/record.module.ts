import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RecordRoutingModule} from "./record.routing.module";
import {RouterModule} from "@angular/router";

import { RecordComponent } from './record/record.component';
import { RecordService } from './record.service';
import {RecordResource} from "./record.resource";
import {RecordsHistoryComponent} from "./records-history/records-history.component";
import {UiModule} from "../ui/ui.module";


@NgModule({
  declarations: [
    RecordComponent,
    RecordsHistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    RecordRoutingModule,
    UiModule
  ],
  providers: [
    RecordResource,
    RecordService
  ],
  exports: [RecordComponent],
  // bootstrap: [RecordComponent]
})
export class RecordModule { }
