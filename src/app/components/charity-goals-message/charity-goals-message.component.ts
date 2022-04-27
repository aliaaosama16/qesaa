import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-charity-goals-message',
  templateUrl: './charity-goals-message.component.html',
  styleUrls: ['./charity-goals-message.component.scss'],
})
export class CharityGoalsMessageComponent implements OnInit {
  @Input() title:string;
  constructor() { }

  ngOnInit() {}

}
