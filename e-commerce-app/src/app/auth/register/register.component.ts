// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserRegistrationDTO } from '../auth-registration.DTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname:['', Validators.required],
      lastname:['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const dto:UserRegistrationDTO={
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        firstname:this.registerForm.value.firstname,
        lastname:this.registerForm.value.lastname      
        
      }
      this.authService.register(dto).subscribe(response => {
        console.log('User registered', response);
        this.router.navigate(['/products']);      });
    }
  }
}
