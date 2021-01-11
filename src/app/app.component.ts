import { Component, HostListener } from '@angular/core';
import { from, Observable, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'calc';

  // res;

  // qs = new Map<number, number[]>();
  quests: [number, number][] = [];
  shuffledQuests: [number, number][] = [];

  plusMin: [number, number][] = [];
  shuffledPlusMin: [number, number][] = [];

  fractions: [number, number, number][] = [];
  shuffledFractions: [number, number, number][] = [];

  where = 0;

  time$ = timer(0, 1000);

  math = Math;

  action;

  // current$ = new Subject<[number, number]>();

  shuffle<T>(inArray: T[]) {
    if (!inArray || inArray.length < 1) {
      return inArray;
    }
    const toShuffle = inArray.slice(0);
    for (let i = toShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]]; // swap elements
    }
    return toShuffle;
  }

  constructor() {
    for (let l = 2; l < 10; l++) {
      for (let r = 2; r < 100; r++) {
        this.quests.push([l, r]);
      }
    }

    for (let l = 2; l < 100; l++) {
      for (let r = 2; r < 100; r++) {
        this.plusMin.push([l, r]);
      }
    }

    for (let l = 2, i = 0; l < 10; l++, i++) {
      for (let r = 2; r < 100; r++) {
        const l1 = i % 2 === 0 ? l : r;
        const r1 = i % 2 !== 0 ? l : r;
        const rand = this.getRandomArbitrary(l1);
        this.fractions.push([rand, l1, r1]);
      }
    }
  }

  ngOnInit() {
    this.shuffledQuests = this.shuffle(this.quests);
    this.shuffledPlusMin = this.shuffle(this.plusMin);
    this.shuffledFractions = this.shuffle(this.fractions);
  }

  inc() {
    this.where++;
  }

  getQ0(i: number, q: [number, number]) {
    return i % 2 === 0 ? q[0] : q[1];
  }

  getQ1(i: number, q: [number, number]) {
    return i % 2 === 0 ? q[1] : q[0];
  }

  getRandomArbitrary(max: number) {
    return Math.floor(Math.random() * (max - 1) + 1);
  }

  // floor(n) {
  //   return Math.floor(n);
  // }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    event.returnValue = confirm('You may loose your progress, leave anyway?');
  }


}
