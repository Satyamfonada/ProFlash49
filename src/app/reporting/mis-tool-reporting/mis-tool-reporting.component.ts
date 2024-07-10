import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-tool-reporting',
  templateUrl: './mis-tool-reporting.component.html',
  styleUrls: ['./mis-tool-reporting.component.scss']
})
export class MisToolReportingComponent {
  items = [
    { title: 'smpp_report.rpt', size: '4 KB' },
    { title: 'summary_camp_all.rpt  ', size: '2 KB' },
    { title: 'addressbook.rpt', size: '4 KB' },
    { title: 'summary_api_all.rpt', size: '2 KB' },
    { title: 'msisdnsearch.rpt', size: '4 KB' },
    { title: 'senderidops.rpt', size: '2 KB' },
    { title: 'credit_report_all.rpt', size: '4 KB' },
    { title: 'another_report.rpt', size: '2 KB' },
    { title: 'smpp_report.rpt', size: '4 KB' },
    { title: 'another_report.rpt', size: '2 KB' },
    { title: 'smpp_report.rpt', size: '4 KB' },
    { title: 'another_report.rpt', size: '2 KB' },
  ];

  
}
