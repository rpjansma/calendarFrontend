import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[backgroudColor]',
})
export class BackgroudColorDirective {


  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'rgba(60, 60, 60, 0.2');
  }
}
