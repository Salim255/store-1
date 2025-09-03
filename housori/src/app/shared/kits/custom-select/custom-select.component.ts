// custom-select.component.ts
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomSelectService } from './custom-select.service';
import { Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent ),
      multi: true,
    }
  ]
})
export class CustomSelectComponent implements OnInit, OnDestroy {
  @Input() options: string [] = [];
  selectedOption = 'all';
  private customSelectSubscription!: Subscription;
  dropdownOpen = false;

  // --- ControlValueAccessor callbacks ---
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private customSelectService: CustomSelectService){}
  ngOnInit(): void {
    this.subscribeToCustomSelect()
  }

  subscribeToCustomSelect(){
    this.customSelectSubscription = this.customSelectService
    .getOpenSelectStatus
    .subscribe(openSelect => {
      this.dropdownOpen = openSelect === this;
    })
  }

  toggleDropdown() {
    if (!this.dropdownOpen) {
      this.customSelectService.open(this)
    } else {
      this.customSelectService.close(this);
    }

  }

  selectOption(option: string, event: Event) {
    event.stopPropagation(); // prevent toggleDropdown from firing
    this.selectedOption = option;
    this.dropdownOpen = false;

    // --- Update Angular form value ---
    this.onChange(option);
    this.onTouched();
  }

  // --- ControlValueAccessor methods ---
  // sets the selected value from the form
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.selectedOption = value;
    }
  }

  // stores a callback to call when the user changes the value
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // stores a callback for when the control is touched.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.customSelectSubscription?.unsubscribe();
  }

  // How it works under the hood

  // You add your component into a form:

  // <app-custom-select formControlName="category"></app-custom-select>


  // Angular looks at formControlName="category" and asks:
  // 👉 “Is this a component that knows how to work with forms?”

  // It finds the providers: [{ provide: NG_VALUE_ACCESSOR, ... }] in your component,
  // so it knows your component is a ControlValueAccessor.

  // Then Angular does this internally (simplified):

  // Angular sets up the callbacks for you
  // controlAccessor.registerOnChange((value) => {
  //  formControl.setValue(value);
  //});

  // controlAccessor.registerOnTouched(() => {
  //  formControl.markAsTouched();
  //});
}
