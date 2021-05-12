import $ from 'jquery';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { PlatformDetector } from '../../../core/plataform-detector/plataform-detector.service';
import { UserService } from '../../../core/user-service/user.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['../home.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private platformDetectorService: PlatformDetector
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.authenticate(username, password).subscribe(
      (data) => {
        console.log(data);
        const authToken = data.headers.get('x-access-token');
        this.userService.setToken(authToken);
        this.router.navigate(['calendar']);
      },
      (error) => {
        console.log(error);
        this.loginForm.reset();
        this.platformDetectorService.isBrowser() &&
          this.usernameInput.nativeElement.focus();
        alert('Invalid username or password');
      }
    );
  }
}
