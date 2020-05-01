import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

declare const Camera;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public showLinkModal: boolean;
  public photoLink: string;

  constructor(
    private sanitizer: DomSanitizer,
    public shared: SharedService,
    public router: Router
  ) {
    shared.appBarLabel = 'Tori';
  }

  ngOnInit(): void {}

  public triggerCamera(): void {
    const self = this;
    (<any>navigator).camera.getPicture(onSuccess, onFail, {
      destinationType: Camera.DestinationType.DATA_URL,
    });
    function onSuccess(uri): void {
      new Promise(() => {
        self.shared.uploadedImage = `data:image/jpeg;base64,${uri}`;
      }).then(() => self.router.navigateByUrl('/confirmacao'));
    }
    function onFail(err): void {
      console.log(err);
    }
  }

  public uploadOpen(): void {
    const input: any = document.querySelector('input#img');
    input.click();
  }

  public setUploadedImage(input): void {
    this.shared.uploadedImage = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(input.files[0])
    );
    this.router.navigateByUrl('/confirmacao');
  }

  public setUploadedUrl(url): void {
    this.shared.uploadedImage = url;
    this.router.navigateByUrl('/confirmacao');
  }
}
