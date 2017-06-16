import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { RecordComponent} from "./record/record.component";
import {RecordsHistoryComponent} from "./records-history/records-history.component";

export const recordRoutes: Routes = [
  {
    path: 'record',
    // component: RecordComponent,
    children: [
      {
        path: 'history',
        component: RecordsHistoryComponent,
      }
    ]
  }
  // ,
  // { path: '',
  //   redirectTo: 'record',
  //   pathMatch: 'full'
  // },
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(recordRoutes)
  ],
  providers: [],
  exports: [RouterModule]
})
export class RecordRoutingModule { }
