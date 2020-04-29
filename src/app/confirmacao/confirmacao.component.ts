import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ModelService } from '../services/model.service';
@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements AfterViewInit {

  public loading: boolean = true;

  constructor(
    public shared: SharedService,
    public model: ModelService
  ) { }

  ngAfterViewInit(): void {
    const img = document.querySelector('img');
    if (img.src.includes('blob')) {
      console.log(img);
      setTimeout(() => {
        this.model.predict(img).then(res => {
          res.print();
          this.loading = false;
        })
      }, 100)
    }
  }

}
