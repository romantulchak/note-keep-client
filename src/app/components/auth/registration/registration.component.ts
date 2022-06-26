import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from 'src/app/requests/auth/sign-up.request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initRegistrationFormGroup();
  }

  /**
   * Register user with email and password 
   * and with optional parameters firstName and lastName 
   */
  public signUp(): void{
      const signUpRequest = this.registrationFormGroup.value as SignUpRequest;
      this.authService.signUp(signUpRequest).subscribe(
        () => {
          console.log('Ok');
        }
      );
  }

  /**
   * Initialize registration form group
   */
  private initRegistrationFormGroup(): void{
    this.registrationFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(85)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      firstName: ['', Validators.maxLength(25)],
      lastName: ['', Validators.maxLength(25)]
    });
  }

}
