import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ModelService } from '../services/model.service';

declare const tf;

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
      setTimeout(() => {
        this.model.predict(img).then(res => {
          const {values, indices} = tf.topk(res, 5);
          values.print();
          indices.print();
          // stop loading
          this.loading = false;
        })
      }, 100)
    }
  }

}
