import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/messages/notifications.service";
import { MenuItem } from "../menu-item/menu-item-model";
import { CartItem } from "./cart-item.model";

@Injectable() // para dizer que o servico pode ter dependencias injetadas
export class ShoppingCartService {

    constructor(private notificationService: NotificationService) {

    }

    itens: CartItem[] = [];

    clear() {
        this.itens = [];
    }

    itemsValue(): number {
        return this.total()
    }

    addItem(item: MenuItem) {
        let found = this.itens.find((mItem) => mItem.menuItem.id === item.id);
        if (found) {
            this.increaseQty(found)
        } else {
            this.itens.push(new CartItem(item));
        }
        this.notificationService.notify(`Você adicionou um item ${item.name}`)
    }

    removeItem(item: CartItem) {
        this.itens.splice(this.itens.indexOf(item), 1);
        this.notificationService.notify(`Você adicionou um item ${item.menuItem.name}`)
    }

    total(): number {
        return this.itens
            .map(i => i.value())
            .reduce((prev, value) => prev + value, 0)

    }

    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1;
    }

    decreaseQty(item: CartItem) {
        item.quantity = item.quantity - 1;

        if (item.quantity == 0) {
            this.removeItem(item);
        }
    }

}