import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { WhoisService } from '../whois.service';
import { MatDialog } from '@angular/material/dialog';
import { WhoisResultTable } from '../whois.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTableComponent implements OnInit {
  @Input({ required: true }) rows!: WhoisResultTable;
  @Input({ required: true }) type!: string;
  columns = WhoisService.columns;
  inverseAttributes = WhoisService.inverseAttributes;

  constructor(private whoisService: WhoisService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
}
