import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ChartDataModel, ChartDataResponseModel } from "../../model";
import { ChartDataService } from "../../services/chart-data.service";
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject, concat } from "rxjs";
import { map } from "rxjs/operators";
@UntilDestroy()
@Component({
  selector: "vex-stock-transactions",
  templateUrl: "./stock-transactions.html",
  styleUrls: ["./stock-transactions.component.scss"],
})
export class StockTransactionsComponent implements OnInit {
  companyList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];
  companies = new FormControl([], Validators.required);
  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });
  chartDataResponse$ = new BehaviorSubject<ChartDataResponseModel[]>([]);
  formSubmitted: boolean = false;
  constructor(private chartService: ChartDataService) {}

  ngOnInit() {}
  sendFormData() {
    const selectedCompanies: string[] = this.companies.value;
    let endDate = new Date(
      this.range.value.end.setDate(this.range.value.end.getDate() + 1)
    );
    if (!this.companies.invalid && !this.range.invalid) {
      this.formSubmitted = true;
      this.chartDataResponse$.next([]);
      const requests = selectedCompanies.map((company) => {
        return this.chartService.getChartData(company);
      });
      concat(...requests)
        .pipe(
          map((response: ChartDataModel) => {
            const symbol = response["Meta Data"]["2. Symbol"];
            const startDateStr = this.range.value.start
              .toISOString()
              .split("T")[0];
            const endDateStr = endDate.toISOString().split("T")[0];
            const data = Object.entries(response["Time Series (Daily)"])
              .filter(
                ([date, values]) => date >= startDateStr && date <= endDateStr
              )
              .map(([date, values]) => ({
                date,
                close: parseFloat(values["4. close"]),
              }))
              .reverse();
            return { symbol, data };
          })
        )
        .subscribe(
          (chartDataResponse) => {
            this.chartDataResponse$.next([
              ...this.chartDataResponse$.value,
              chartDataResponse,
            ]);
          },
          (error) => {
            this.formSubmitted = false;
            endDate = new Date(
              this.range.value.end.setDate(this.range.value.end.getDate() - 1)
            );
            console.log(error);
          },
          () => {
            this.formSubmitted = false;
            endDate = new Date(
              this.range.value.end.setDate(this.range.value.end.getDate() - 1)
            );
            console.log("All requests completed.");
          }
        );
    } else {
      console.log("Please select a Date or Stock");
    }
  }
}
