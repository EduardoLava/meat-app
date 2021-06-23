import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantService } from 'app/restaurants/restaurant/restaurant.service';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) { }

  restaurant: Restaurant;

  ngOnInit() {

    this.restaurantService.restaurantById(this.route.snapshot.params['id'])
    .subscribe(rest => this.restaurant = rest)
  }

}
