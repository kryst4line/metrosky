import {Directive, ElementRef, HostListener, output} from '@angular/core';

@Directive({
  selector: '[vScroll]'
})
export class ScrollDirective {
  scrollEnding = output();
  scrollTop = output();
  emitted = false;

  constructor(
    private elemRef: ElementRef
  ) {}

  @HostListener('scroll', [])
  onScroll() {
    if (!this.elemRef.nativeElement.scrollTop) {
      this.emitted = true;
      this.scrollTop.emit();
    } else if (this.elemRef.nativeElement.scrollTop + this.elemRef.nativeElement.offsetHeight + 300 >= this.elemRef.nativeElement.scrollHeight && !this.emitted) {
      this.emitted = true;
      this.scrollEnding.emit();
    } else if (this.elemRef.nativeElement.scrollTop + this.elemRef.nativeElement.offsetHeight + 300 < this.elemRef.nativeElement.scrollHeight) {
      this.emitted = false;
    }
  }

}
