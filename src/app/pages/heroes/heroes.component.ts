import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = []

  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {
  
  this.heroesService.getHeroes()
      .subscribe( resp => this.heroes = resp);
  }

  borrarHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire({
      title: 'esta seguro ?',
      text: `esta seguro que desea borra a ${ heroe.nombre }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if( resp.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }
    } );

  }
}
