import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
  exports: [TableComponent],
  imports: [CommonModule, NgxDatatableModule],
  declarations: [TableComponent],
})
export class SharedModule {}
