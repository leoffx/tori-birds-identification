import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikiavesService {

  private baseUri: string = 'https://www.wikiaves.com.br';

  constructor(
    public http: HttpClient
  ) { }

  public getImagesOfSpecies(id: string): any {
    let images: any[] = [];
    this.http.get(`${this.baseUri}/getRegistrosJSON.php?tm=f&t=s&s=${id}&o=mp&p=1`)
      .subscribe((res: any) => {
        Object.values(res.registros.itens).forEach((item: any, i) => {
          if (i < 5) {
            item.link = item.link.replace('#', 'q');
            images.push(item.link.replace('#', 'q'));
          }
        });
      });
    console.log(images);
    return images;
  }
}
