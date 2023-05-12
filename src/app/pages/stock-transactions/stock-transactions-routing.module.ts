import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import {StockTransactionsComponent} from "./stock-transactions.component";


const routes: Routes = [
  {
    path: '',
    component: StockTransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class StockTransactionsRoutingModule {
}
