
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameOfLifeComponent } from './components/game-of-life/game-of-life.component';

import { GameUtilsService } from './services/game-utils.service';
import { GameOfLifeService } from './services/game-of-life.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [GameOfLifeComponent],
  providers: [
    GameOfLifeService,
    GameUtilsService
  ],
  exports: [GameOfLifeComponent]
})
export class GameOfLifeModule { }
