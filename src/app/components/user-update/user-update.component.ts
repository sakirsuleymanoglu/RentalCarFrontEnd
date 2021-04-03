import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserForRegisterDto } from 'src/app/models/userForRegisterDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  user: User;
  userUpdateForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.getUserById();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userId: any = localStorage.getItem('userId');
      let userForRegisterDto: UserForRegisterDto = Object.assign(
        {},
        this.userUpdateForm.value
      );
      this.userService
        .update(userForRegisterDto, userId)
        .subscribe((response) => {
          if (response.success) {
            localStorage.setItem(
              'fullName',
              userForRegisterDto.firstName + ' ' + userForRegisterDto.lastName
            );
            window.location.reload();
          }
        });
    }
  }

  getUserById() {
    let userId: any = localStorage.getItem('userId');
    this.userService.getUserById(userId).subscribe((response) => {
      this.user = response.data;
    });
  }
}
