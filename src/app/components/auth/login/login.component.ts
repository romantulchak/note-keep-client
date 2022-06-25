import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFrogGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  /**
   * Initialize login form group
   */
  private initLoginForm(): void{
    this.loginFrogGroup = this.fb.group({
      email: ['', Validators.required, Validators.min(4), Validators.max(85)],
      password: ['', Validators.required, Validators.min(4), Validators.max(60)]
    });
  }

}
