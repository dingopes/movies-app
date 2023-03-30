import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = 'Youtube';
  @Input() key: string = '';

  videoUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    switch (this.site) {
      case 'Youtube':
        this.videoUrl = this.sanitizedUrl('http://www.youtube.com/embed' + this.key);
        break;
      case 'Vimeo':
        this.videoUrl = this.sanitizedUrl('http://www.vimeo.com/' + this.key);
        break;
    }
  }

  sanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
