import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../Consts';
import { PayRequest } from '../Models/PayRequest';
import { PayResponse } from '../Models/PayResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  stripeUrl = ApiUrl + "Stripe/";

  GetAllProducts(): any {
    return this.http.get<any>(this.stripeUrl + "GetAllProducts");
  }

  Pay(request: PayRequest): Observable<PayResponse> {
    return this.http.post<PayResponse>(this.stripeUrl + "Pay", request);
  }
}
