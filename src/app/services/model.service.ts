import { Injectable } from '@angular/core';

declare const tf;

@Injectable({
  providedIn: 'root'
})
export class TfService {

  public model: any;

  init() {
    const MODEL_URL = 'assets/tf/model.json';
    tf.loadGraphModel(MODEL_URL).then(res => this.model = res);
  }

  public async predict(foto): Promise<any> {
    return await tf.tidy(() => {
      const fotoTensor = tf.expandDims(tf.browser.fromPixels(foto)).asType('float32');
      return this.model.predict(fotoTensor);
    });
  }
}
