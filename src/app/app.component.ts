import { Component, HostListener } from '@angular/core';
import { flatten } from '@angular/core/src/render3/util';
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

  decs: [number, number, number][] = [];
  sDecs: [number, number, number][] = [];
  aDecs: [number, number, number][] = [];
  asDecs: [number, number, number][] = [];

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

    for (let i = 5.01; i < 7.5; i += .01) {
      // const i1 = Math.floor(i * 100) / 100;
      const i1 = Number.parseFloat(i.toFixed(2));
      const dgd = this.getlowestfraction(i1);
      this.decs.push([i1, dgd[0], dgd[1]]);
    }
    for (let i = -9.99; i < -7.5; i += .01) {
      // const i1 = Math.floor(i * 100) / 100;
      const i1 = Number.parseFloat(i.toFixed(2));
      const dgd = this.getlowestfraction(i1);
      this.decs.push([i1, dgd[0], dgd[1]]);
    }
    // console.log(`decs ${this.decs.length}`);
    // console.log(JSON.stringify(this.decs));
    // for (let i = 5.01; i < 10.00; i += .01) {
    //   const i1 = Math.floor(i * 100) / 100;
    //   const dgd = this.getlowestfraction(i1);
    //   this.aDecs.push([i1, ...dgd]);
    // }
    // console.log(JSON.stringify(this.aDecs));

    // for (let l = 2, i = 0; l < 100; l++, i++) {
    //   for (let r = 2; r < 100; r++) {
    //     this.decimals.push([l, r]);
    //   }
    // }
  }

  ngOnInit() {
    this.shuffledQuests = this.shuffle(this.quests);
    this.shuffledPlusMin = this.shuffle(this.plusMin);
    this.shuffledFractions = this.shuffle(this.fractions);
    this.sDecs = this.shuffle(this.decs);
    this.asDecs = this.shuffle(this.decs);
  }

  rightDec(d: number, a: number, i: number) {
    const dgd = i%2 ? (d + a) : (d - a);
    return Number.parseFloat(dgd.toFixed(2));
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

  decFl(n: number) {//return new Number(n).toFixed(2);
    // return Math.floor((n + Number.EPSILON) * 100) / 100
    return Math.floor(n);
  }
  dec(a: [number, number], b: [number, number]) {
    return this.decFl(a[0] / a[1]) + this.decFl(b[0] / b[1]);
  }

  getlowestfraction(x0: number): [number, number] {
    const eps = 1.0E-15;
    let h, h1, h2, k, k1, k2, a, x;

    x = x0;
    a = Math.floor(x);
    h1 = 1;
    k1 = 0;
    h = a;
    k = 1;

    while (x - a > eps * k * k) {
      x = 1 / (x - a);
      a = Math.floor(x);
      h2 = h1; h1 = h;
      k2 = k1; k1 = k;
      h = h2 + a * h1;
      k = k2 + a * k1;
    }

    return [h, k];
  }

  // floor(n) {
  //   return Math.floor(n);
  // }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    event.returnValue = confirm('You may loose your progress, leave anyway?');
  }

  coeff(i: number) {
    return i%2 ? 1 : -1;
  }

}
