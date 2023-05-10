import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  elements: NodeListOf<HTMLElement> | null = null;
  loginForm!: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.elements = document.querySelectorAll('.login');
    console.log(this.elements)
    gsap.fromTo(this.elements, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
    })
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.form['email'].value, this.form['password'].value)
      .subscribe({
        next: () => {
          console.log(sessionStorage.getItem('currentUserToken'));
          this.router.navigate(['/dashboard']);
          this.error = "";
        },
        error: (error) => {
          if (error.status == 401) this.error = "Invalid email or password";
          else this.error = "Something went wrong"
        }
      })
  }
}
