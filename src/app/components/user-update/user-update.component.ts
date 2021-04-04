import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserForRegisterDto } from 'src/app/models/userForRegisterDto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastrService:ToastrService
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
            this.toastrService.success(response.message, 'Bilgileri Güncelle');
            window.location.reload();  
          }
        },(responseError)=>{
          this.toastrService.error(responseError.error.message, "Bilgileri Güncelle");
        });
    }else{
      this.toastrService.error("Boş bırakılamaz", "Bilgileri Güncelle");
    }
  }

  getUserById() {
    let userId: any = localStorage.getItem('userId');
    this.userService.getUserById(userId).subscribe((response) => {
      this.user = response.data;
    });
  }
}
