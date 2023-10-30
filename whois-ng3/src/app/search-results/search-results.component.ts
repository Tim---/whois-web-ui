import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { WhoisResults } from '../whois.service';



@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {
  @Input({ required: true }) tables!: WhoisResults;

  constructor() { }

  ngOnInit(): void {
  }
}
