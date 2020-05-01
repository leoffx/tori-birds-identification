import { Injectable } from '@angular/core';

declare const tf;

@Injectable({
  providedIn: 'root'
})
export class TfService {

  public model: any;

  init() {
    const MODEL_URL = 'https://www.kor-ui.com/assets/model.json';
    tf.loadGraphModel(MODEL_URL).then(res => this.model = res);
  }

  public async predict(foto): Promise<any> {
    return await tf.tidy(() => {
      const fotoTensor = tf.browser.fromPixels(foto)
        .resizeNearestNeighbor([224, 224])
        .asType('float32');

      const fotoNormalizada = fotoTensor
        .div([255])
        .expandDims();

      return this.model.predict(fotoNormalizada);
    });
  }
}
