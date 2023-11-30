import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css',
  providers: [HttpClient]
})
export class GameFormComponent implements OnInit{

  @HostBinding('class') clases = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute,private _http: HttpClient) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.gameService.getGame(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      )
  }

updateGame() {
    delete this.game.created_at;
    if (this.game.id) {
        this.gameService.updateGame(this.game.id, this.game)
            .subscribe(
                res => {
                    console.log(res);
                    this.router.navigate(['/games']);
                },
                err => console.error(err)
            );
    }
}

}
