import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumberFormatter]'
})
export class PhoneNumberFormatterDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    let inputValue = this.el.nativeElement.value.replace(/[^0-9]/g, ''); // Remove all non-digit characters
    const formattedValue = this.formatPhoneNumbers(inputValue);
    this.control.control?.setValue(formattedValue, { emitEvent: false });
  }

  private formatPhoneNumbers(value: string): string {
    const numbersArray = value.match(/.{1,10}/g) || []; // Split into chunks of 10 digits
    return numbersArray.join(','); // Join chunks with a comma
  }
}
