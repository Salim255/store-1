import { Component, Input, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-place-holder',
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.scss'],
  standalone: false,
})

export class Placeholder {
  @Input() componentName!: string;
  mainText: string = '';
  btnText: string = '';
  placeHolderData = [{ btn: 'Keep Shopping' , text: 'You cart is empty. keep shopping to find a product' }]
  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.setData();
  }

  setData(){
    switch(this.componentName){
      case 'checkout':
        this.btnText = this.placeHolderData[0].btn;
        this.mainText = this.placeHolderData[0].text;
        return;
      default:
        this.btnText = this.placeHolderData[0].btn;
        this.mainText = this.placeHolderData[0].text;
        return;
    }
  }
}
