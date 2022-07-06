import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
