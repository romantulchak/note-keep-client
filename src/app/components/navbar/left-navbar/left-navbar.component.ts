import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss']
})
export class LeftNavbarComponent implements OnInit {

  public isNavbarOpened: boolean;

  constructor(private navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this.getNavbarStatus();
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
}
