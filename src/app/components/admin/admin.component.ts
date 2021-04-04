import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let userId: any = localStorage.get('userId');
    if (this.authService.isAuthenticated()) {
      this.userService.CheckIfIsAdmin(userId).subscribe((response) => {
        if (!response.success) {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
