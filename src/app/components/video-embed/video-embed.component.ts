import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = 'YouTube';
  @Input() key: string = '';

  videoUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.site && this.key) {
      switch (this.site) {
        case 'YouTube':
          this.videoUrl = this.sanitizedUrl('http://www.youtube.com/embed/' + this.key);
          break;
        case 'Vimeo':
          this.videoUrl = this.sanitizedUrl('https://www.vimeo.com/' + this.key);
          break;
      }
    }
  }

  sanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
