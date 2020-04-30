import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { TfService } from '../services/model.service';

declare const tf;

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements AfterViewInit {

  public loading: boolean = true;
  public suggestions: any[] = [];

  constructor(
    public shared: SharedService,
    public tfService: TfService
  ) { }

  ngAfterViewInit(): void {
    const img = document.querySelector('img');
    if (img.src.includes('blob')) {
      setTimeout(() => {
        this.tfService.predict(img).then(res => {
          const {values, indices} = tf.topk(res, 10);
          const indicesArray = indices.arraySync()[0];
          const valuesArray = values.arraySync()[0];
          // iterate on each of top 10 suggestios
          indicesArray.forEach((value, index) => {
            // model suggestion data
            let suggestionData = {
              index: value,
              confidence: valuesArray[index],
              speciesId: null
            }
            // push to suggestions array
            this.suggestions.push(suggestionData)
          });
          // stop loading
          this.loading = false;
        })
        // TODO: remove log
        .then(() => console.log(this.suggestions))
      }, 0)
    }
  }

}
