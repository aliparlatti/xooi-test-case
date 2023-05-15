import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ChartDataResponseModel } from "../../model";
import { ConvertChartDataService } from "../../services/convert-fusion-chart";

@Component({
  selector: "vex-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  @Input() chartData: Observable<ChartDataResponseModel[]>;

  data = {
    chart: {
      legendPosition: "top",
      captionPosition: "top",
      showhovereffect: "1",
      numbersuffix: "",
      drawcrossline: "1",
      plottooltext:
        "<label class='font-bold text-red-500'>$dataValue</label> - $seriesName",
      theme: "fusion",
    },
    categories: [],
    dataset: [],
  };
  width = "100%";
  height = "400";
  type = "scrollline2d";
  dataFormat = "json";
  dataSource = this.data;
  constructor(private convertData: ConvertChartDataService) {}
  ngOnInit(): void {
    this.chartData.subscribe((res) => {
      const categories = res[0]?.data.map((item) => ({
        label: item.date,
      }));

      const dataset = res.map((item) => ({
        seriesname: item.symbol,
        data: item.data.map((dataPoint) => ({
          value: dataPoint.close.toString(),
        })),
      }));

      this.data.categories = [{ category: categories }];
      this.data.dataset = dataset;
    });
  }
}
