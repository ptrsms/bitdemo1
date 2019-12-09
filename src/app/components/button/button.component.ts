import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bit-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text;

  constructor() { }

  ngOnInit() {
  }

}
