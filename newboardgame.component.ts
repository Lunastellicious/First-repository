import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 70; // Assuming a 10x10 grid
const BOX_LENGTH = 3.7; // Length of each box

@Component({
  selector: 'app-newboardgame', // Use the selector here
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newboardgame.component.html',
  styleUrls: ['./newboardgame.component.css'] // Use 'styles' here instead of 'styleUrl'
})

export class NewboardgameComponent implements OnDestroy, OnInit {
  coordinates: { [key: number]: Position } = {
    1: { x: 26, y: 14 },
    2: { x: 26, y: 13 },
    3: { x: 70, y: 12 },
    4: { x: 60, y: 18 },
    5: { x: 50, y: 24 },
    6: { x: 40, y: 30 },
    7: { x: 30, y: 36 },
    8: { x: 20, y: 42 },
    9: { x: 10, y: 48 },
    10: { x: 15, y: 54 },
    11: { x: 25, y: 60 },
    12: { x: 35, y: 66 },
    13: { x: 45, y: 72 },
    14: { x: 55, y: 78 },
    15: { x: 65, y: 84 },
    16: { x: 75, y: 90 },
    17: { x: 70, y: 96 },
    18: { x: 60, y: 102 },
    19: { x: 50, y: 108 },
    20: { x: 40, y: 114 },
  };
  
  currentPlayerPosition = 1; // Starting position of the player
  imageSrc: string = "";
  private subscription = new Subscription();

  constructor(private sharedService: SharedService, private el: ElementRef, private renderer: Renderer2) {
    this.generateCoordinates();
  }

  ngOnInit(): void {
    const imageSubscription = this.sharedService.getImageSrc().subscribe((src: string) => {
      this.imageSrc = src;
    });
    this.subscription.add(imageSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Dice
  @ViewChild('dice') dice!: ElementRef;
  @ViewChild('rollBtn') rollBtn!: ElementRef;

  randomDice(): void {
    const random = Math.floor(Math.random() * 6) + 1; // Ensure it's between 1 and 6
    this.rollDice(random);
    this.movePlayer(random);
  }

  rollDice(random: number): void {
    const diceEl = this.dice.nativeElement;
    diceEl.style.animation = 'rolling 1s';

    setTimeout(() => {
      switch (random) {
        case 1:
          diceEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
          break;
        case 2:
          diceEl.style.transform = 'rotateX(-90deg) rotateY(0deg)';
          break;
        case 3:
          diceEl.style.transform = 'rotateX(0deg) rotateY(90deg)';
          break;
        case 4:
          diceEl.style.transform = 'rotateX(0deg) rotateY(-90deg)';
          break;
        case 5:
          diceEl.style.transform = 'rotateX(90deg) rotateY(0deg)';
          break;
        case 6:
          diceEl.style.transform = 'rotateX(180deg) rotateY(0deg)';
          break;
        default:
          break;
      }
      diceEl.style.animation = 'none';
    }, 1050);
  }

  //Boardgame
  generateCoordinates(): void {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const boxNumber = Object.keys(this.coordinates).length + 1; // Calculate the next box number
        const x = col * BOX_LENGTH; // Calculate x-coordinate
        const y = row * BOX_LENGTH; // Calculate y-coordinate

        this.coordinates[boxNumber] = { x, y }; // Add the new coordinates to Coordinates
      }
    }
  }

  movePlayer(spaces: number): void {
    const newPosition = this.currentPlayerPosition + spaces;
    if (newPosition <= Object.keys(this.coordinates).length) {
      this.currentPlayerPosition = newPosition;
    } else {
      console.error('Player cannot move beyond the last tile.');
    }
  }
}
