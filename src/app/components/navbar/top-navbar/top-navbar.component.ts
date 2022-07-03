import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  public title: String = 'Keep-note'
  public searchFormGroup: FormGroup;
  public isSearchSelected: boolean;

  constructor(private fb: FormBuilder,
              private navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this.initSearchFormGroup();
    this.initNavbarStatus();
  }

  /**
   * Fires when focus on an element
   */
  public searchSelect(): void {
    this.isSearchSelected = true;
  }

  /**
   * Triggers when the user focuses on an element
   */
  public searchUnselect(): void {
    this.isSearchSelected = false;
  }

  /**
   * Close or open navbar depends on its actual status
   */
  public toggleNavbar(): void {
    const navbarStatus = !this.navbarService.getNavbarStatus();
    this.navbarService.navbarStatus.next(navbarStatus);
    this.navbarService.updateNavbarStatus(navbarStatus)
  }

  /**
   * Initialize search form group
   */
  private initSearchFormGroup(): void {
    this.searchFormGroup = this.fb.group({
      value: ['']
    })
  }

  /**
   * Initiate status of navbar if value doesn't exist
   * in local storage - set it otherwise nothing
   */
  private initNavbarStatus(): void {
    if (!this.navbarService.isNavbarStatusExists()) {
      this.navbarService.updateNavbarStatus(true)
    }
    this.navbarService.updateCurrentStatusForNavbarFromStorage();
  }

}
