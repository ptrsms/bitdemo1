import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'bit-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() heading;
  @Input() img;
  @Input() action;
  @Output() clicked =  new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
