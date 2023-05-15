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
  dates: string[] = [];
  notice: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.data.subscribe((data) => {
      const dates = new Set<string>();
      data.forEach((d) =>
        d.data.forEach((dd) => dates.add(this.formatDate(dd.date)))
      );
      this.dates = [...dates];
      if (this.dates.length === 0 && this.notice) {
        this.dates.push("Verileri Görüntülemek İçin Hisse ve Tarih Seçiniz!");
        this.notice = false;
      }
    });
  }
  formatDate(dateString: string): string {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
  getClosePrice(row: any, d: any): any {
    const data = row.find((x) => this.formatDate(x.date) === d);
    return data ? data.close : "-";
  }
}
