import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WhoisParams } from '../whois.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() search = new EventEmitter<WhoisParams>();

  searchTypes = [{
    name: 'text',
    description: 'Search by text',
  }, {
    name: 'resource',
    description: 'Find a resource',
  }, {
    name: 'inverse',
    description: 'Inverse query',
  }];

  form = this.fb.group({
    query: '',
    type: 'text',
    personal: false,
    limit: 100,
    offset: 0,
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if(!params.keys.length)
        return;
      console.log(params);
      this.form.patchValue({
        query: params.get('query'),
        type: params.get('type'),
        personal: params.get('personal') == 'true',
        limit: Number(params.get('limit')) || null,
        offset: Number(params.get('offset')) || null,
      });

      if(params.get('query')) {
        this.search.emit({
          query: ''+params.get('query'),
          type: ''+params.get('type'),
          personal: params.get('personal') == 'true',
          limit: +Number(params.get('limit')),
          offset: +Number(params.get('offset')),
        });
      }
    });
  }
}
