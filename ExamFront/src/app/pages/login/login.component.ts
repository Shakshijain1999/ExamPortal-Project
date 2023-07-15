import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private login: LoginService,private router: Router) { }
  ngOnInit(): void { }

  formSubmit() {
    console.log('login button clicked');

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is Required', '', {
        duration: 3000,
      });
      return;
    }


    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is Required', '', {
        duration: 3000,
      });
      return;
    }

    // request server to generate token
  this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Success');
        console.log(data);

        // Login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            //redirect ...if ADMIN : admin dashboard
            // redirect if normal : normal dashboard
            if (this.login.getUserRole() == 'ADMIN') {

              // admin dashboard
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);

            } else if (this.login.getUserRole() == 'NORMAL') {
              // normal user dashboard
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);

            } else {
              this.login.logout();
            }
          });

      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.snack.open('Invalid Details!! Try Again', '',{
          duration:3000,
        });
      }
    )
  }
  
}