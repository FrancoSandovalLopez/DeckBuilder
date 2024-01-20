import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dynamic-background',
  templateUrl: './dynamic-background.component.html',
  styleUrls: ['./dynamic-background.component.scss'],
})
export class DynamicBackgroundComponent {
  private images = [
    'url(/assets/images/background/Joan.png)',
    'url(/assets/images/background/Devil.png)',
    // ... other image URLs
  ];
  private currentIndex = 0;
  private intervalId: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const imageUrl = this.images[this.currentIndex];
      this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', imageUrl);
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 1000); // Change every 3 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
