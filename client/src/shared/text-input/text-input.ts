import { Component, forwardRef, input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrls: ['./text-input.css'],   // <-- FIXED
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInput),
      multi: true
    }
  ]
})


export class TextInput implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  maxDate = input<string>('');

  control: FormControl = new FormControl('');

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.control = this.ngControl.control as FormControl;
    }
  }

  writeValue(value: any): void {
    if (value !== undefined && this.control) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}