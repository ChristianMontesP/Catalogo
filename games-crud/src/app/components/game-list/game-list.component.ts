import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
  providers: [GamesService]
})
export class GameListComponent {
  @HostBinding('class') classes = 'row';

  games: any = [];
  constructor(private gameService: GamesService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames()
      .subscribe(
        res => {
          this.games = res;
          console.log(this.games);
        },
        err => console.error(err)
      );
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id)
      .subscribe(
        res => {
          console.log(res);
          this.getGames();
        },
        err => console.error(err)
      )
  }
}

