import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WhoisService, SearchObject, WhoisErrors } from '../whois.service';

@Component({
  selector: 'app-single-object',
  templateUrl: './single-object.component.html',
  styleUrls: ['./single-object.component.css']
})
export class SingleObjectComponent implements OnInit {
  obj: SearchObject;
  errors: WhoisErrors = [];

  constructor(private route: ActivatedRoute, private whoisService: WhoisService) { }

  ngOnInit(): void {
    var self = this;
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.whoisService.getObject(params.get('source'), params.get('type'), params.get('pkey'));
      })
    ).subscribe({
      next(obj) {
        self.obj = obj;
        self.errors = [];
      },
      error(err) {
        self.obj = null;
        self.errors = self.whoisService.convertErrors(err);
      }
    });
  }

}
