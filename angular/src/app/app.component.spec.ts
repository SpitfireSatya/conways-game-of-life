
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GameOfLifeModule } from './game-of-life/game-of-life.module';

import { AppComponent } from './app.component';

import { expect } from 'chai';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        GameOfLifeModule,
        FormsModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).to.equal('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).to.contain('Welcome to Conway\'s Game of Life');
  }));

});
