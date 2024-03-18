import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../Services/stripe.service';
import { take } from 'rxjs';
import { PayRequest } from '../../Models/PayRequest';

@Component({
  selector: 'app-productssection',
  standalone: true,
  imports: [],
  templateUrl: './productssection.component.html',
  styleUrl: './productssection.component.css'
})
export class ProductssectionComponent implements OnInit{

  public productsList: any[] = []; 

  constructor(private stripeService: StripeService) { }

  ngOnInit(): void {
    this.stripeService.GetAllProducts().pipe(take(1)).subscribe((data: any) => {
      this.productsList = data;
    });
  }

  Pay(product: any) {
    let request: PayRequest = { priceId: product.defaultPriceId };
    this.stripeService.Pay(request).pipe(take(1)).subscribe(x => {
      window.location.href = x.url;
    });
  }
}
