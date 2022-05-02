import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productive-families',
  templateUrl: './productive-families.page.html',
  styleUrls: ['./productive-families.page.scss'],
})
export class ProductiveFamiliesPage implements OnInit {
  families: any[] = [
    {
      id:1,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },
    {
      id:2,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },
    {
      id:3,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },
    {
      id:4,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },
    {
      id:5,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },
    {
      id:6,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },
    {
      id:7,
      name: 'اسم الشخص',
      image: './../assets/images/family.svg',
    },  
  ];
  constructor() {}

  ngOnInit() {}
}
