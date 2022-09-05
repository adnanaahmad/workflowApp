import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {
  }

}
