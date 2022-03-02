import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interfaces';
import { Message } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Helpers } from '../../../shared/helpers/helpers';
import { Md5 } from 'ts-md5';

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
      name: ['', [ Validators.required ]],
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
    const md5 = new Md5();
    const passMd5 = md5.appendStr(this.loginForm.value.password).end();
    const response = this.authServices.authenticateUser(this.user.name, passMd5);
    if (response) {
      this.authServices.setAuth({
        user: this.user.name,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      });
      this.loginSuccess();
    } else {
      this.msgError = this.helpers.msgAlert('error', 'Usuario o clave incorrecto.');
    }
  }

  loginSuccess(): void {
    this.router.navigateByUrl('/main');
  }

}
