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
  constructor(private chartService: ChartDataService) {}

  ngOnInit() {}
  sendFormData() {
    this.chartDataResponse$.next([]);
    const selectedCompanies: string[] = this.companies.value;
    if (!this.companies.invalid && !this.range.invalid) {
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
            const endDateStr = new Date(
              this.range.value.end.setDate(this.range.value.end.getDate() + 1)
            )
              .toISOString()
              .split("T")[0];
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
            // console.log(chartDataResponse);
            this.chartDataResponse$.next([
              ...this.chartDataResponse$.value,
              chartDataResponse,
            ]);
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log("All requests completed.");
          }
        );
    } else {
      console.log("HATA EKSİK VERİ");
    }
  }
}
