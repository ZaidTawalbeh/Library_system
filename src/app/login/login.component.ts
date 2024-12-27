import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response);
        if (response.roleid === 2) {
          this.toastr.success(`Welcome ${response.username}`);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userid', response.userid);
          // Delay navigation to allow the toast to display
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1000); // Adjust the delay as needed (in milliseconds)
        } else {
          this.toastr.error( `Unknown user`);
        }
      },
      (error) => {
        this.toastr.error(`Unknown user`);
      }
    );
  }
}