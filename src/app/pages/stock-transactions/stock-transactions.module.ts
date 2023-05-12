import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockTransactionsComponent } from "./stock-transactions.component";

import { StockTransactionsRoutingModule } from "./stock-transactions-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  declarations: [StockTransactionsComponent],
  imports: [
    CommonModule,
    StockTransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "tr-TR" }],
})
export class StockTransactionsModule {}
