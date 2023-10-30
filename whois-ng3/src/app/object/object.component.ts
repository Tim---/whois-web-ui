import { Component, OnInit, Input } from '@angular/core';
import { SearchAttribute } from '../whois.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  @Input({ required: true }) obj!: SearchAttribute[];
  columns = ['name', 'value'];

  constructor() { }

  ngOnInit(): void {
  }

}
