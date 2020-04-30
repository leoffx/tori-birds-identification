import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    public shared: SharedService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  public uploadOpen(): void {
    const input: any = document.querySelector('input#img');
    input.click();
  }

  public setUploadedImage(input): void {
    this.shared.uploadedImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(input.files[0]));
    this.router.navigateByUrl('/confirmacao');
  }

  public setUploadedUrl(input): void {
    if (input.value && input.value.indexOf('http') > -1) {
      this.shared.uploadedImage = input.value;
      this.router.navigateByUrl('/confirmacao');
    } else {
      input.status = 'error';
    }
  }

}
