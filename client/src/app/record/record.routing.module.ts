import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { RecordComponent} from "./record.component";

export const recordRoutes: Routes = [
  {
    path: 'record',
    component: RecordComponent,
    data: { title: 'Record' },
    children: [
      // {
      //   path: ':recordId',
      //   component: RecordComponent,
      //   resolve: {
      //     record: RecordResolver
      //   }
      // }
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
