import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartComponent } from "./chart/chart.component";
import { FusionChartsModule } from "angular-fusioncharts";
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  exports: [TableComponent, ChartComponent],
  imports: [CommonModule, NgxDatatableModule, FusionChartsModule],
  declarations: [TableComponent, ChartComponent],
})
export class SharedModule {}
