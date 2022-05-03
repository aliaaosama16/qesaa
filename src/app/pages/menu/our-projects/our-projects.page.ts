import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-projects',
  templateUrl: './our-projects.page.html',
  styleUrls: ['./our-projects.page.scss'],
})
export class OurProjectsPage implements OnInit {
  projects: any = [
    {
      id: 1,
      title: 'عنوان المشروع',
      image:'./../../../../assets/images/projects/img1.svg'
    },
    {
      id: 2,
      title: 'عنوان المشروع',
      image:'./../../../../assets/images/projects/img2.svg'
    },
    {
      id: 3,
      title: 'عنوان المشروع',
      image:'./../../../../assets/images/projects/img3.svg'
    },
    {
      id: 4,
      title: 'عنوان المشروع',
      image:'./../../../../assets/images/projects/img4.svg'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
