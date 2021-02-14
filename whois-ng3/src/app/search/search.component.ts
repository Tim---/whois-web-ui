import { Component, OnInit } from '@angular/core';
import { WhoisService, SearchResult, SearchObject, WhoisErrors, WhoisResults, WhoisParams } from '../whois.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  objects: SearchObject[];
  tables: WhoisResults = {};
  errors: WhoisErrors = [];
  hasmore: boolean = false;
  params: WhoisParams;

  constructor(private whoisService: WhoisService) { }

  ngOnInit(): void {
  }

  search(params: WhoisParams) {
    this.objects = [];
    this.tables = {};
    this.errors = [];
    this.hasmore = false;
    this.params = params;

    this.loadMore();
  }

  loadMore() {
    let self = this;
    this.whoisService.search(self.params).subscribe({
      next(objects) {
        self.objects.push(...objects);
        self.tables = self.whoisService.resultToTable(self.objects);
        self.errors = [];
        self.hasmore = objects.length == self.params.limit;
        self.params.offset += objects.length;
      },
      error(err) {
        self.objects = [];
        self.tables = {};
        self.errors = self.whoisService.convertErrors(err);
        self.hasmore = false;
      }
    });
  }
}
