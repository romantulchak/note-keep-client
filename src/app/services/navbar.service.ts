import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

const KEY = 'isNavbarOpened';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public navbarStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
    this.getNavbarStatus();
  }

  /**
   * Updates navbar status
   *
   * @param status to be updated
   */
  public updateNavbarStatus(status: boolean) {
    localStorage.setItem(KEY, JSON.stringify(status));
  }

  /**
   * Updates current status for navbar from local storage
   */
  public updateCurrentStatusForNavbarFromStorage(): void {
    this.navbarStatus.next(this.getNavbarStatus());
  }

  /**
   * Gets actual navbar status from local storage
   */
  public getNavbarStatus(): boolean {
    return JSON.parse(localStorage.getItem(KEY) || 'true');
  }

  /**
   * Checks if key 'isNavbarOpened' exists in local storage
   */
  public isNavbarStatusExists(): boolean {
    return localStorage.getItem(KEY) !== null;
  }
}
