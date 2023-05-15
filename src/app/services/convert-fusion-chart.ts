import { Injectable } from "@angular/core";
import { ChartDataResponseModel } from "../model";
@Injectable()
export class ConvertChartDataService {
  transformData(data: ChartDataResponseModel[]): any {
    const chartData: any[] = [];

    data.forEach((symbolData) => {
      const categoryData: any[] = [];

      symbolData.data.forEach((datum) => {
        categoryData.push({ label: datum.date });
      });

      chartData.push({
        seriesname: symbolData.symbol,
        data: symbolData.data.map((datum) => ({ value: datum.close })),
      });

      chartData[chartData.length - 1].category = categoryData;
    });

    return chartData;
  }
}
