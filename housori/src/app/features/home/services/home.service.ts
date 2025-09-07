import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class HomeService {
  homeDescription: string;
  homeHeader: string;

  constructor(){
    this.homeHeader = `We are're changing the way people shop.`;
    this.homeDescription = `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Eius aspernatur, velit minus magni saepe doloribus similique unde ratione voluptatum culpa
          amet cumque at sapiente aliquam recusandae dolorem explicabo reprehenderit autem.`
  }
}
