import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {
  @Input() tables;

  constructor() { }

  ngOnInit(): void {
  }
}
