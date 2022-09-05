import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {ToasterComponent} from './components/common/toaster/toaster.component';
import {BoardService} from './components/boardServices/board.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private service: BoardService,
              private router: Router,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  logoutUser() {
    this.service.Logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['/login'])
        .then(result => {
        }).catch(err => {
        console.log(err);
      });
      this.snackbar.openFromComponent(ToasterComponent,
        {data: 'You are logged out'});
    });
  }
}
