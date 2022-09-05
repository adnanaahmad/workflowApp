import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginRegService} from '../../../navigation/components/services/login-reg.service';
import {Router} from '@angular/router';
import {ToasterComponent} from '../../../navigation/components/common/toaster/toaster.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  RegForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(private RegisterService: LoginRegService,
              private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }
  Register(): any {
    this.RegisterService.Register(this.RegForm.value).subscribe(res => {
      this.snackbar.openFromComponent(ToasterComponent,
        {data: 'You are successfully registered'});
      this.router.navigate(['/login']);
    }, error => {
        this.snackbar.openFromComponent(ToasterComponent,
          {data: 'You are not registered, please try again ...'});
    });
  }
}
