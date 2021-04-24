import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-base-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}
}
