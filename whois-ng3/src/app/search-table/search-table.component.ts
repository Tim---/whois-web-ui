import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { WhoisService } from '../whois.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTableComponent implements OnInit {
  @Input() rows;
  @Input() type;
  columns = WhoisService.columns;
  inverseAttributes = WhoisService.inverseAttributes;

  constructor(private whoisService: WhoisService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
}
