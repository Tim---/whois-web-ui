import { Component, OnInit, Input } from '@angular/core';
import { SearchObject } from '../whois.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  @Input() obj: SearchObject;
  columns = ['name', 'value'];

  constructor() { }

  ngOnInit(): void {
  }

}
