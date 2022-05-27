import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  // input property
  // ao usar <app-loader> é possivel ultilizar
  // <app-loader label="Carregando diários..."> </app-loader>
  @Input() label: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
