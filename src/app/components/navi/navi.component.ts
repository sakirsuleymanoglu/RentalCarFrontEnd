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
    if (this.isAuthenticated) {
      this.setUserFullName();
      this.getUserId();
      this.CheckIfIsAdmin();
    }
  }

  logout() {
    this.localStorageService.delete('token');
    this.localStorageService.delete('fullName');
    this.localStorageService.delete('userId');
    this.localStorageService.delete('userFindeks');
    this.localStorageService.delete('carFindeks');
    this.localStorageService.delete('balance');
    this.localStorageService.delete('creditCardFirstName');
    this.localStorageService.delete('creditCardLastName');
    this.localStorageService.delete('creditCardLastUseDate');
    this.localStorageService.delete('creditCardSecurityValue');
    this.localStorageService.delete('creditCardNumber');
    this.localStorageService.delete('dailyPrice');
    this.localStorageService.delete('carId');
    this.localStorageService.delete('customerId');
    this.localStorageService.delete('rentDate');
    this.localStorageService.delete('returnDate');
    this.isAuthenticated = false;
  }

  setUserFullName() {
    this.userFullName = this.localStorageService.get('fullName');
  }

  getUserId() {
    this.userId = this.localStorageService.get('userId');
  }

  CheckIfIsAdmin() {
    this.userService.CheckIfIsAdmin(this.userId).subscribe((response) => {
      this.isAdmin = response.success;
    });
  }
}
