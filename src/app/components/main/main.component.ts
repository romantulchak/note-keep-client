import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbar.service";
import {ActivatedRoute, ActivationStart, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isNavbarOpened: boolean;
  public isCreateNoteShow: boolean = true;

  constructor(private navbarService: NavbarService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getNavbarStatus();
    this.getRouteTypeOnInit();
    this.getRouteTypeOnChange();
  }

  /**
   * Gets active navbar status
   */
  private getNavbarStatus(): void {
    this.navbarService.navbarStatus.subscribe(
      res => {
        this.isNavbarOpened = res;
      }
    );
  }

  /**
   * Gets route type
   */
  private getRouteTypeOnChange(): void {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        let routeType = event.snapshot.data.type;
        this.isCreateNoteShow = routeType !== 'ARCHIVE';
      }
    });
  }

  /**
   * Gets route type on component init
   */
  private getRouteTypeOnInit(): void {
    this.route.url.subscribe(() => {
      if (this.route.snapshot.firstChild?.data.type === 'ARCHIVE') {
        this.isCreateNoteShow = false;
      }
    });
  }

}
