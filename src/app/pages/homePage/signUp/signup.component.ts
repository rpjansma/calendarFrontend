import { PlatformDetector } from './../../../core/plataform-detector/plataform-detector.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../../core/user-service/user.service';

@Component({
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private platformDetectorService: PlatformDetector
  ) {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  register() {
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    this.userService.createUser(username, email, password).subscribe(
      () => this.router.navigate(['']),
      (error) => {
        console.log(error);
        this.registerForm.reset();
        this.platformDetectorService.isBrowser() &&
          this.usernameInput.nativeElement.focus();
        alert('ERROR: Try again, please.');
      }
    );
  }
}
