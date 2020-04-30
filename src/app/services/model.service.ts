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
      const offsetStd = [120.621185, 123.66904 ,  92.16345]
      const offsetMean = [58.277973, 57.294533, 65.83054]
      const fotoTensor = tf.browser.fromPixels(foto)
        .resizeNearestNeighbor([224,224])
        .asType('float32')
      
      const fotoNormalizada = fotoTensor
        .sub(offsetStd)
        .div(offsetMean)
        .expandDims()
      
    
      return this.model.predict(fotoNormalizada);
    });
  }
}
