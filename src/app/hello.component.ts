import { Component, Input, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'hello',
  template: `<div  class="main-container" >
  <div class="input-box-container" >


      <input type="text" [(ngModel)]="rgbCodeColor">

  </div>
  <div class="hoverboard-container container"  (window:keydown.pageup)="calculateCurrentView()" (window:keydown.pagedown)="calculateCurrentView()">
      <div class="row-container"  *ngFor="let grids of gridContainerList;let row = index" >
          <div class="boxes"   (click)="handleSetCurrentKey(item,row,col)"  [ngClass]="{'active': currentActiveKey === item}"  *ngFor="let item of grids;let col = index" [style.background]="item" ></div>
      </div>
  </div>
</div>
`,
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent {
  gridContainerList: any = [];
  currentActiveKey: any = '';
  currentIndexGrid: any = [0, 0];
  rgbCodeColor: any = '';

  ngOnInit(): void {
    this.generateHoverBoard();
  }

  generateColor() {
    return `#${Math.ceil(Math.random() * 16777215).toString(16)}`;
  }
  handleSetCurrentKey(key: string, row: any, col: any) {
    this.currentActiveKey = key;
    this.rgbCodeColor = this.hexToRgb(this.currentActiveKey);
    this.currentIndexGrid = [row, col];
  }
  calculateCurrentView() {
    console.log('check');
  }
  hexToRgb(hex: string): string {
    if (!hex.length) return '';
    // Remove '#' if present
    hex = hex.replace('#', '');

    // Extract the red, green, and blue components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return the RGB color code
    return `rgb(${r}, ${g}, ${b})`;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let gridVal = this.currentIndexGrid;
    if (event.key === 'ArrowUp') {
      if (gridVal[0] !== 0) {
        this.currentIndexGrid = [--gridVal[0], gridVal[1]];
        this.currentActiveKey =
          this.gridContainerList[this.currentIndexGrid[0]][
            this.currentIndexGrid[1]
          ];
      }
    }
    if (event.key === 'ArrowDown') {
      if (gridVal[0] !== this.gridContainerList.length - 1) {
        this.currentIndexGrid = [++gridVal[0], gridVal[1]];
        this.currentActiveKey =
          this.gridContainerList[this.currentIndexGrid[0]][
            this.currentIndexGrid[1]
          ];
      }
    }
    if (event.key === 'ArrowLeft') {
      if (gridVal[1] !== 0) {
        this.currentIndexGrid = [gridVal[0], --gridVal[1]];
        this.currentActiveKey =
          this.gridContainerList[this.currentIndexGrid[0]][
            this.currentIndexGrid[1]
          ];
      }
    }
    if (event.key === 'ArrowRight') {
      if (gridVal[1] !== this.gridContainerList[0].length - 1) {
        this.currentIndexGrid = [gridVal[0], ++gridVal[1]];
        this.currentActiveKey =
          this.gridContainerList[this.currentIndexGrid[0]][
            this.currentIndexGrid[1]
          ];
      }
    }
    this.rgbCodeColor = this.hexToRgb(this.currentActiveKey);
  }

  generateHoverBoard() {
    let grid = [8, 20];
    let gridContainer = [];
    let uniqueColors: any = {};
    for (let i = 0; i < grid[0]; i++) {
      let gridVal = [];
      for (let k = 0; k < grid[1]; k++) {
        let color = this.generateColor();
        while (uniqueColors[color]) {
          color = this.generateColor();
        }
        uniqueColors[color] = true;
        gridVal.push(color);
      }
      gridContainer.push(gridVal);
    }
    this.gridContainerList = gridContainer;
  }
}
