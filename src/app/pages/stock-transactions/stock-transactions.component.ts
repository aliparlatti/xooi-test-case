import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "vex-stock-transactions",
  templateUrl: "./stock-transactions.html",
  styleUrls: ["./stock-transactions.component.scss"],
})
export class StockTransactionsComponent implements OnInit {
  companys = new FormControl("");
  companyList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor() {}

  ngOnInit() {}

  sendFormData() {
    console.log(this.companys.value);
  }
}
