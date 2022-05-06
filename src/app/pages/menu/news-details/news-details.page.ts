import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {
 newsDetails:any= {
  id: 1,
  title: 'test_title',
  content: 'test_subtitle',
  date: '‏12 مارس 2021',
  image:'./../../../../assets/images/news-image.svg'
}
  constructor() { }

  ngOnInit() {
  }

}
