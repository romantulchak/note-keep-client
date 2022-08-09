import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateLabelComponent} from "../../dialogs/create-label/create-label.component";
import {LabelService} from "../../../services/label.service";
import {LabelDTO} from "../../../dto/label.dto";

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss']
})
export class LeftNavbarComponent implements OnInit {

  public isNavbarOpened: boolean;
  public labels: LabelDTO[];

  constructor(private navbarService: NavbarService,
              private labelService: LabelService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getNavbarStatus();
    this.getLabels();
  }

  /**
   * Opens dialog for creating/editing labels
   */
  public showCreateLabelDialog(): void {
    this.dialog.open(CreateLabelComponent);
  }

  /**
   * Get labels created by user
   */
  private getLabels(): void {
    this.labelService.getLabelsForUser().subscribe(
      res => {
        this.labels = res;
      }
    )
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
