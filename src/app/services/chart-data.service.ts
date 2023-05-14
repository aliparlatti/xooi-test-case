import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { ChartDataModel } from "../model";

@Injectable({
  providedIn: "root",
})
export class ChartDataService {
  private apiKey = environment.API_KEY;
  private apiUrl =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&";

  constructor(private http: HttpClient) {}

  getChartData(company: string): Observable<ChartDataModel> {
    return this.http
      .get<ChartDataModel>(
        this.apiUrl + `symbol=${company}&apikey=${this.apiKey}`
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          let errorMessage = "An error occurred while fetching chart data.";
          if (error.status === 404) {
            errorMessage = "The requested resource was not found.";
          } else if (error.status === 500) {
            errorMessage = "An internal server error occurred.";
          }
          return throwError(errorMessage);
        })
      );
  }
}
