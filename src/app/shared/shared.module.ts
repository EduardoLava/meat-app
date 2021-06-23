import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderService } from "app/order/order.service";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantService } from "app/restaurants/restaurant/restaurant.service";
import { InputComponent } from "./input/input.component";
import { NotificationService } from "./messages/notifications.service";
import { SnackbarComponent } from "./messages/snackbar/snackbar.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,// na raiz é importado como BrowserModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        // para que os outros modulos que vao utilizar o shared module não precisarem importa as dependencias abaixo
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SnackbarComponent
    ]
})
export class SharedModule {

    /**
     * usando para importar um modulo com os providers
     * @returns 
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantService, OrderService, NotificationService]
        }
    }

}