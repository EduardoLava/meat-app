import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup


  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: "MON" },
    { label: 'Cartão de Débito', value: "DEB" },
    { label: 'Cartão Refeição', value: "REF" },
  ]


  delivery: number = 8;// em uma aplicação real viria do back

  constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) { }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.fb.control(''),
      paymentOption: this.fb.control('', [Validators.required]),
    }, {
      validator: OrderComponent.equalsTo
    })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if (!email && !emailConfirmation) {
      return undefined
    }

    if (email.value != emailConfirmation.value) {
      return { emailsNotMatch: true }
    }

    return undefined


  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {

    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(
      item.quantity,
      item.menuItem.id)
    )

    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary'])
        console.log(`Compra concluida ${orderId}`)
        this.orderService.clear()
      })




  }

}
