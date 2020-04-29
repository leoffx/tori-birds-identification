import { Injectable } from '@angular/core';

declare const tf;

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public model: any;

  constructor() {
    const MODEL_URL = "assets/torinet/model.json";
    tf.loadGraphModel(MODEL_URL).then(res => this.model = res);
  }

  public async predict(foto): Promise<any> {
    return await tf.tidy(() => {
      const foto_tensor = tf.expandDims(tf.browser.fromPixels(foto)).asType('float32');
      return this.model.predict(foto_tensor);
    })
  }
}
