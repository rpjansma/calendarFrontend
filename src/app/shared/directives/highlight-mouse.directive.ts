import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]',
})
export class HighlightMouseDirective {
  @HostListener('mouseenter') onMouseOver() {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'backgroundColor',
    //   'rgba(60,60,60,0.5)'
    // );

    this.backgroundColor = this.color1


  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'backgroundColor', 'rgba(60,60,60,0.2)'
    // )

    this.backgroundColor = this.color2;

  }

  @HostBinding('style.backgroundColor') backgroundColor: string;

   @Input() color1
   @Input() color2

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
