import { Component, OnInit } from '@angular/core';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthenticated: boolean;
  userFullName: any;
  operationClaims: OperationClaim[];
  email: string;
  userId: any;
  claims: string;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated){
      this.setUserFullName();
      this.getUserId();
      this.CheckIfIsAdmin();
    } 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
    this.isAuthenticated = false;
  }

  setUserFullName() {
    this.userFullName = localStorage.getItem('fullName');
  }

  getUserId() {
    this.userId = localStorage.getItem('userId');
  }

  CheckIfIsAdmin(){
    this.userService.CheckIfIsAdmin(this.userId).subscribe((response)=>{
      this.isAdmin = response.success;
    });
  }

 
}
