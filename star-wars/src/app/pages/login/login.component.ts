import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[0-9]*'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.valid) {
      this.authService
        .login(this.form.value)
        .subscribe((isLogged) =>
          isLogged ? this.router.navigate(['/admin']) : console.log('wrong password')
        );
    }
  }

  onPatchValue() {
    this.form.patchValue({input: 'text'})
  }
}
