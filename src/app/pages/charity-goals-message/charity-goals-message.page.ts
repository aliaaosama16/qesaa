import { PageData } from 'src/app/models/pageData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-charity-goals-message',
  templateUrl: './charity-goals-message.page.html',
  styleUrls: ['./charity-goals-message.page.scss'],
})
export class CharityGoalsMessagePage implements OnInit {
  pageData: PageData;
  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit() {
    this.pageData = this.data.getPageData();
  }
}
