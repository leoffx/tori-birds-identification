import { Component, AfterViewInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { TfService } from "../services/model.service";
import { WikiavesService } from "../services/wikiaves.service";

declare const tf;
declare const require;

@Component({
  selector: "app-confirmacao",
  templateUrl: "./confirmacao.component.html",
  styleUrls: ["./confirmacao.component.scss"],
})
export class ConfirmacaoComponent implements AfterViewInit {
  public loading = true;
  public suggestedSpecies: any[] = [];
  public birdDictionary = require("../../assets/tf/mappingPredictionToObject.json");
  public selectedSpecies = {
    name: undefined,
    image: undefined,
  };

  constructor(
    public shared: SharedService,
    private tfService: TfService,
    private wikiaves: WikiavesService
  ) {
    //shared.appBarLabel = "Sugestōes";
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tfService.model
        ? this.startPrediction()
        : this.tfService.init().then(() => this.startPrediction());
    }, 1000);
  }

  private startPrediction(): void {
    const img = document.querySelector("img");
    this.tfService.predict(img).then((res) => {
      const { values, indices } = tf.topk(res, 10);
      const indicesArray = indices.arraySync()[0];
      const valuesArray = values.arraySync()[0];
      // iterate on each of top 10 suggestios
      indicesArray.forEach((index, i) => {
        const bird: any = this.birdDictionary[index];
        // model suggestion data
        const suggestionData = {
          index,
          confidence: Math.floor(valuesArray[i] * 100),
          id: bird.id,
          name: bird.name,
          age: bird.age,
          sex: bird.sex,
          images: this.wikiaves.getImagesOfSpecies(bird.id),
        };
        // push to suggestions array (if more than 10% confidence)
        if (suggestionData.confidence > 10) {
          this.suggestedSpecies.push(suggestionData);
        }
      });
      // stop loading
      this.loading = false;
    });
  }

  public openWiki(name: string): void {
    window.open(`https://www.wikiaves.com.br/wiki/${name}`);
  }
}
