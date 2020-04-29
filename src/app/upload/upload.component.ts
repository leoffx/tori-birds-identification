import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public uploadedImage: SafeUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  public uploadOpen(): void {
    const input: any = document.querySelector('input#img');
    input.click();
  }

  public setUploadedImage(input): void {
    this.uploadedImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(input.files[0]));
  }

}
