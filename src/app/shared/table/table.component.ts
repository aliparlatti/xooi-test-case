import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ChartDataResponseModel } from "../../model";

@Component({
  selector: "vex-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() data: Observable<ChartDataResponseModel[]>;

  constructor() {}

  ngOnInit(): void {
    this.data.subscribe((res) => {
      console.log(res);
    });
  }
}
