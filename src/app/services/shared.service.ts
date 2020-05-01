import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public uploadedImage: SafeUrl;
  public appBarLabel: string;

  constructor() { }
}
