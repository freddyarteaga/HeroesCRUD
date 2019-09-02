import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
// el operador map sirve para transformar lo que un observador peude regresar
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudheroes-6b980.firebaseio.com'

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${ this.url }/heroes.json`, heroe)
          .pipe(
            map( (resp: any) => {
              heroe.id = resp.name; 
              return heroe;
            } )
          )

  }

  actualizarHeroe( heroe: HeroeModel ) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroes () {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              map( this.crearArreglo )
            );
  }

  private crearArreglo ( heroesObj: object ) {

    const heroes: HeroeModel[] = [];

    console.log(heroesObj);

    if ( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );      

    } );
    

    return heroes;
  }

  borrarHeroe ( id: string ) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`)
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

}
