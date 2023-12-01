import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';


@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({required: true}) audioUrl: string = ''
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer
  isPaying = signal(false);

  isBrowser = false;
  //En el constructor, se utiliza isPlatformBrowser(this.platformId) para determinar si el código se está ejecutando en un navegador
  //ESto se usa si la libreria no es compatible con angular universal 
  constructor(@Inject(PLATFORM_ID) private platformId:any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {

    if (this.isBrowser) {
      this.ws = WaveSurfer.create({
        url: this.audioUrl,
        container: this.container.nativeElement
      });
      this.ws.on('play',() => this.isPaying.set(true));
      this.ws.on('pause',() => this.isPaying.set(false));
    }
   
  }

  playPauser(){
    this.ws.playPause();
  }

}
