import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartComponent } from "./chart/chart.component";
import { FusionChartsModule } from "angular-fusioncharts";
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { ConvertChartDataService } from "../services/convert-fusion-chart";
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  exports: [TableComponent, ChartComponent],
  imports: [CommonModule, NgxDatatableModule, FusionChartsModule],
  declarations: [TableComponent, ChartComponent],
  providers: [ConvertChartDataService],
})
export class SharedModule {}
