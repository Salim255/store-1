// custom-select.component.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomSelectService } from './custom-select.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, OnDestroy {
  @Input() options: string [] = [];
  selectedOption = 'car';
  private customSelectSubscription!: Subscription;
  dropdownOpen = false;
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
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.customSelectSubscription?.unsubscribe();
  }
}
