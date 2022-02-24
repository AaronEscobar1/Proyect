import { Component, Input, OnInit } from '@angular/core';
import { ModuleCard } from '../../interfaces/modules-card.interfaces';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.scss']
})
export class CardMainComponent implements OnInit {

  @Input() modulesCard!: ModuleCard[];

  constructor() { }

  ngOnInit(): void {
  }

}
