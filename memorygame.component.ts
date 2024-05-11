import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memorygame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.css']
})
export class MemorygameComponent implements OnInit {
  cards: any[] = []; //defines array
  hasFlippedCard: boolean = false; 
  lockBoard: boolean = false; 
  firstCard: any; //comparison first card
  secondCard: any; //comparison second card

  ngOnInit() { //cards array
    this.cards = this.shuffle([
      { id: 1, name: 'A', img: 'assets/cards/A-upper.svg', type: 'match1', flipped: false },
      { id: 2, name: 'a', img: 'assets/cards/a-lower.svg', type: 'match1', flipped: false },
      { id: 3, name: 'B', img: 'assets/cards/B-upper.svg', type: 'match2', flipped: false },
      { id: 4, name: 'b', img: 'assets/cards/b-lower.svg', type: 'match2', flipped: false },
      { id: 5, name: 'H', img: 'assets/cards/H-upper.svg', type: 'match3', flipped: false },
      { id: 6, name: 'h', img: 'assets/cards/h-lower.svg', type: 'match3', flipped: false },
      { id: 7, name: 'D', img: 'assets/cards/D-upper.svg', type: 'match4', flipped: false },
      { id: 8, name: 'd', img: 'assets/cards/d-lower.svg', type: 'match4', flipped: false },
      { id: 9, name: 'R', img: 'assets/cards/R-upper.svg', type: 'match5', flipped: false },
      { id: 10, name: 'r', img: 'assets/cards/r-lower.svg', type: 'match5', flipped: false },
      { id: 11, name: 'Æ', img: 'assets/cards/Æ-upper.svg', type: 'match6', flipped: false },
      { id: 12, name: 'æ', img: 'assets/cards/æ-lower.svg', type: 'match6', flipped: false },
    ]);
  }
  shuffle(array: any[]): any[] { //randomizes the game
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(card: any): void { //flips card
    if (this.lockBoard) return; 
    if (card === this.firstCard) return;

    card.flipped = true; 

    if (!this.hasFlippedCard) { 
      // First click
      this.hasFlippedCard = true;
      this.firstCard = card;
      return;
    }

    // Second click
    this.secondCard = card;
    this.checkForMatch();
  }

  checkForMatch(): void { //checks the type property to see if its a match
    const isMatch = this.firstCard.type === this.secondCard.type;

    isMatch ? this.disableCards() : this.unflipCards(); //if it is a match it disables 'disablecards' method. if not it calls'unflipcards' method
  }

  disableCards(): void {
    this.firstCard.matched = true;
    this.secondCard.matched = true;
    this.resetBoard();
  }

  unflipCards(): void {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.flipped = false;
      this.secondCard.flipped = false;

      this.resetBoard();
    }, 1500);
  }

  resetBoard(): void { //reset mini-game
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
  }
}

