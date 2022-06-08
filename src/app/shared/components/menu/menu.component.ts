import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  @Input() menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
