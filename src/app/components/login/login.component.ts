import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserForLoginDto } from 'src/app/models/userForLoginDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  operationClaims: OperationClaim[];
  userForLoginDto: UserForLoginDto;
  mail:string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userForLoginDto = Object.assign({}, this.loginForm.value);
      this.mail = this.userForLoginDto.email;
      this.getUserByMail(this.mail);
      this.authService.login(this.userForLoginDto).subscribe((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('fullName', this.user.firstName + ' ' + this.user.lastName);
        localStorage.setItem('userId', this.user.id.toString());
        window.location.reload();
      });
    }
  }

  getUserByMail(mail:string){
    this.userService.getUserByEMail(mail).subscribe((response)=>{
      this.user = response.data;
    })
  }
}
