import { Component, HostListener } from '@angular/core';
import { from, Observable, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// interface tuple
export class AppComponent {
  title = 'calc';

  // res;

  // qs = new Map<number, number[]>();
  quests: [number, number][] = [];
  shuffledQuests: [number, number][] = [];
  where = 0;

  time$ = timer(0, 1000);

  math = Math;

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
  }

  ngOnInit() {
    this.shuffledQuests = this.shuffle(this.quests);
  }

  inc() {
    this.where++;
  }

  // floor(n) {
  //   return Math.floor(n);
  // }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    event.returnValue = confirm('You may loose your progress, leave anyway?');
  }


}
