import { PlatformDetector } from './../../../core/plataform-detector/plataform-detector.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import $ from "jquery"

@Component({
  templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetector
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ngOnInit(): void {};

  login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.authenticate(username, password).subscribe(
      () => this.router.navigate(['calendar']),
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
