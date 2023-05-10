import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  elements: NodeListOf<HTMLElement> | null = null;
  signupForm!: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.elements = document.querySelectorAll('.signup');
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
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.authService
      .signup(this.form['email'].value, this.form['password'].value)
      .subscribe({
        next: () => {
        },
        error: () => {
          this.error = "Something went wrong";
        }
      });
  }
}
