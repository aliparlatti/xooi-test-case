import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [TableComponent],
  imports: [CommonModule, MatTableModule],
  declarations: [TableComponent],
})
export class SharedModule {}
