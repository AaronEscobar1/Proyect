import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interfaces';
import { Message } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Helpers } from '../../../shared/helpers/helpers';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user!: User;
  msgError: Message[] = [];

  constructor(private authServices: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private helpers: Helpers) {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    const auth = this.authServices.getAuth();
    if (auth) {
      this.loginSuccess();
    }
  }

  login(): void {
    this.msgError = [];
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.authServices.authenticateUser(this.loginForm.value)
      .subscribe({
        next: (resp) => {
          if (resp.tokenDeAcceso) {
            this.authServices.setAuth(resp);
            this.spinner.hide();
            this.loginSuccess();
          }
        },
        error: (err) => {
          this.spinner.hide();
          if (err.status === 401 || err.error.message == 'Bad credentials') {
            this.msgError = this.helpers.msgAlert('error', 'Usuario o clave incorrecto.');
          }
          if (err.status === 500 || err.status === 0 || err.error.message == "Unknown.") {
            this.msgError = this.helpers.msgAlert('error', 'No hubo conexión con el servidor.');
          }
        }
      });
  }

  loginSuccess(): boolean {
    this.router.navigateByUrl('/main');
    return true;
  }

}
