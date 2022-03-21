import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interfaces';
import { Message } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Helpers } from '../../../shared/helpers/helpers';

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
              private helpers: Helpers) {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    if (this.authServices.getAuth()) {
      this.loginSuccess();
    }
  }

  login(): void {
    this.msgError = [];
    if (this.loginForm.invalid) {
      return;
    }
    this.user = this.loginForm.value;
    this.authServices.authenticateUser(this.user)
      .subscribe(
        (resp) => {
          if (resp.tokenDeAcceso) {
            this.authServices.setAuth(resp);
            this.loginSuccess();
          }
        }, (error) => {
          if (error.error.mensaje === this.helpers.BAD_CREDENTIALS) {
            this.msgError = this.helpers.msgAlert('error', 'Usuario o clave incorrecto.');
          } else {
            console.log(error);
          }
        }
      );
  }

  loginSuccess(): void {
    this.router.navigateByUrl('/main');
  }

}
