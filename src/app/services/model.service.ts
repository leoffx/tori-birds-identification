import { Injectable } from '@angular/core';

declare const tf;

@Injectable({
  providedIn: 'root',
})
export class TfService {
  public model: any;

  public init(): Promise<any> {
    const MODEL_URL = '../../assets/model.json';
    return tf.loadGraphModel(MODEL_URL).then((res) => {
      this.model = res;
      console.log('initialized model:');
      console.log(res);
    });
  }

  public async predict(foto): Promise<any> {
    console.log('starting prediction:');
    console.log(this.model);
    return await tf.tidy(() => {
      const fotoTensor = tf.browser
        .fromPixels(foto)
        .resizeNearestNeighbor([224, 224])
        .asType('float32');
      const fotoNormalizada = fotoTensor.div([255]).expandDims();
      return this.model.predict(fotoNormalizada);
    });
  }
}
