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
    this.route.queryParams.subscribe(params => {
      const patch = {};
      if(params['query'])
        patch['query'] = params['query'];
      if(params['type'])
        patch['type'] = params['type'];
      if(params['personal'] && params['personal'] == 'true')
        patch['personal'] = true;
      if(params['limit'])
        patch['limit'] = +params['limit'];
      if(params['offset'])
        patch['offset'] = +params['offset'];
      
      this.form.patchValue(patch);

      if(params['query']) {
        this.search.emit(this.form.value);
      }
    });
  }
}
