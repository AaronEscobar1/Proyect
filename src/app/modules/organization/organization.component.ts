import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styles: []
})
export class OrganizationComponent implements OnInit {
  
  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
