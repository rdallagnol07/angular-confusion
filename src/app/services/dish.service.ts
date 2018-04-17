import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dish } from '../shared/dish';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular) { }

    getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
    }

    getDish(id: number): Observable<Dish> {
      return  this.restangular.one('dishes',id).get();
    }

    getFeaturedDish(): Observable<Dish> {
      return this.restangular.all('dishes').getList({featured: true})
        .map(dishes => dishes[0]);
    }

    getDishIds(): Observable<any> {
      return this.getDishes()
        .map(dishes => { return dishes.map(dish => dish.id) })
        .catch(error => { return error; } );
    }

}
