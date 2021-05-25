import $ from 'jquery';
import { timeout } from 'rxjs/operators';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { PlatformDetector } from '../../../core/plataform-detector/plataform-detector.service';
import { UserService } from '../../../core/user-service/user.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['../home.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;

  login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;

    this.authService.authenticate(username, password).subscribe(
      (data) => {
        const authToken = data.headers.get('x-access-token');
        this.userService.setToken(authToken);
        this.loading = false;
        this.router.navigate(['calendar']);
      },
      (error) => {
        this.loading = false;
        alert('Invalid username or password');
        console.log(error);
        this.loginForm.reset();
        this.platformDetectorService.isBrowser() &&
          this.usernameInput.nativeElement.focus();
      }
    );
  }

  isRequiredAndTouched(control: string) {
    return !this.loginForm.get(control).valid && this.loginForm.get(control).touched;
  }

  ngOnInit(): void {
    console.log(this.isRequiredAndTouched('username'));
  }

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
}
