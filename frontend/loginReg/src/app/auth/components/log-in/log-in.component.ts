import {Component, OnDestroy, OnInit} from '@angular/core';
import { LoginRegService} from '../../../navigation/components/services/login-reg.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToasterComponent} from '../../../navigation/components/common/toaster/toaster.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

  UserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private loginService: LoginRegService,
              private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  Login(): any {
    this.loginService.Login(this.UserForm.value).subscribe(res => {
      if (res.responseDetails.code === 200) {
        this.snackbar.openFromComponent(ToasterComponent,
          {
            data: 'You are successfully logged in'
          });
        this.loginService.Token(res.data.auth_token);
        localStorage.setItem('token', res.data.auth_token);
        this.loginService.UpdateId(res.data.id);
        localStorage.setItem('id', res.data.id);
        this.router.navigate(['/home']);
      } else {
        this.snackbar.openFromComponent(ToasterComponent,
          {
            data: res.responseDetails.message
          });
      }
    }, error => {
      this.snackbar.openFromComponent(ToasterComponent,
        {data: 'Failed to login'});
    });
  }
}
