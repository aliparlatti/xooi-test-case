import { Component, OnInit, ViewChild } from "@angular/core";
import { LayoutService } from "../../@vex/services/layout.service";
import { filter, map, mergeMap, startWith, take } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { checkRouterChildsData } from "../../@vex/utils/check-router-childs-data";
import { BreakpointObserver } from "@angular/cdk/layout";
import { ConfigService } from "../../@vex/config/config.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { SidebarComponent } from "../../@vex/components/sidebar/sidebar.component";
import { Title } from "@angular/platform-browser";

@UntilDestroy()
@Component({
  selector: "vex-custom-layout",
  templateUrl: "./custom-layout.component.html",
  styleUrls: ["./custom-layout.component.scss"],
})
export class CustomLayoutComponent implements OnInit {
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(
    map((config) => config.footer.visible)
  );
  isDesktop$ = this.layoutService.isDesktop$;

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data) => data.toolbarShadowEnabled
      )
    )
  );

  @ViewChild("configpanel", { static: true }) configpanel: SidebarComponent;

  title: string;
  icon: string;
  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.title = data.title;
        this.icon = data.icon;
      });
  }

  ngOnInit() {
    this.layoutService.configpanelOpen$
      .pipe(untilDestroyed(this))
      .subscribe((open) =>
        open ? this.configpanel.open() : this.configpanel.close()
      );
  }
}
