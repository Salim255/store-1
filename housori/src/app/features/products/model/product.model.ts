export class Product {
  constructor(
    public _id: string,
    public name: string,
    public company: string,
    public description: string,
    public category: string,
    public featured: boolean,
    public price: number,
    public shipping: boolean,
    public shippingPrice: number,
    public images: string [],
    public colors: string []
  ){

  }
}
