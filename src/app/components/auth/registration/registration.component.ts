import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * Initialize registration form group
   */
  private initRegistrationFormGroup(): void{
    this.registrationFormGroup = this.formBuilder.group({
      email: ['', Validators.required, Validators.min(4), Validators.max(85)],
      password: ['', Validators.required, Validators.min(4), Validators.max(60)],
      firstName: ['', Validators.max(25)],
      lastName: ['', Validators.max(25)]
    });
  }

}
