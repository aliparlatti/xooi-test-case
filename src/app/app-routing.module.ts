import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";

const routes: Routes = [
  {
    path: "",
    component: CustomLayoutComponent,
    data: { title: "Anasayfa", icon: "mat:home" },
    children: [
      {
        path: "pages",
        children: [
          {
            path: "stock-transactions",
            data: { title: "Hisse Senedi Analizi", icon: "mat:insights" },
            loadChildren: () =>
              import(
                "./pages/stock-transactions/stock-transactions.module"
              ).then((m) => m.StockTransactionsModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
