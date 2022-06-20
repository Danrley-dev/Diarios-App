import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cols: number = 2;
  rows: string = "2:2";

  constructor(
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe((status: BreakpointState) => {
      if (status.breakpoints[Breakpoints.XSmall]) {
        this.cols = 1;
        this.rows = "1.5:2"

      }
      if (status.breakpoints[Breakpoints.Small]) {
        this.cols = 2;
        this.rows = "1.6:2"

      }
      if (status.breakpoints[Breakpoints.Medium]) {
        this.cols = 2;
        this.rows = "2:2"

      }

    })
  }
}
