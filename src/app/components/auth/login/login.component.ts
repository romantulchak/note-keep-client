import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInRequest} from 'src/app/requests/auth/sign-in.request';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFrogGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  /**
   * Authenticate user by its email and password
   */
  public signIn(): void{
    const signInRequest = this.loginFrogGroup.value as SignInRequest;
    this.authService.signIn(signInRequest).subscribe(
      res => {
        this.authService.saveToken(res.jwt);
      }
    )
  }

  /**
   * Initialize login form group
   */
  private initLoginForm(): void{
    this.loginFrogGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(85)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]]
    });
  }

}
