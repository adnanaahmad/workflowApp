import {Component, OnInit, ViewChild} from '@angular/core';
import {CanvasWhiteboardUpdate} from 'ng2-canvas-whiteboard';
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';
import {WhiteboardService} from '../whiteboardServices/whiteboard.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit {
  @ViewChild('canvasWhiteboard', {static: false}) canvasWhiteboard: CanvasWhiteboardComponent;
  url: any;

  whiteBoardForm: any;
  constructor( private boardservice: WhiteboardService, private sanitizer: DomSanitizer) {

    this.boardservice.getWhiteBoard().subscribe(res => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    // White board is a Component Directive
  }

  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);

    // generating data
    this.whiteBoardForm = {
      image: this.canvasWhiteboard.generateCanvasDataUrl('image/jpeg', 0.3),
      member_id: localStorage.getItem('id'),
    };
    console.log(this.whiteBoardForm);
    // sending post request

    this.boardservice.saveWhiteBoard(this.whiteBoardForm).subscribe(res => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });

  }
}
