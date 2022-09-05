import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {

  NoteForm = new FormGroup({
    content: new FormControl('', Validators.required),
    member_id: new FormControl(''),
    id: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<AddNotesComponent>,
    @Inject(MatDialogModule) public data: any) {}

  onNoClick(): string {
    return 'NO';
  }
  createNote(): any {
    this.NoteForm.value.member_id = localStorage.getItem('id');
    this.data = this.NoteForm.value;
    return {status: 'YES', data: this.data};
  }

  ngOnInit() {
  }

}
