import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {

  public loading: boolean = true;

  constructor(
    public shared: SharedService
  ) { }

  ngOnInit(): void {
  }

}
