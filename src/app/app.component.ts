import { Component } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	rows = [
		{
			points: 0,
			toFirst: 0,
			toSecond: 0,
			toThird: 0
		};
	];

	sum = 0;
	remaining = 0;
	first = 0;
	second = 0;
	third = 0;

	update(row) {
		this.sum = this.rows.reduce((a,b) => Number(a) + Number(b.points),0);
		this.remaining = this.max - this.sum;
		this.rows = this.rows.sort((a,b)=> b.points - a.points);

		this.first = this.rows[0].points;
		this.second = this.rows.length >= 2 ? this.rows[1].points : 0;
		this.third = this.rows.length >= 3 ? this.rows[2].points : 0;

		for(let r in this.rows){
			let row = this.rows[r];

			let lockFirst = (this.remaining + this.first - row.points)/2;

			if( lockFirst <= 0){
				row.toFirst = "L";
			}
			else if(lockFirst < this.remaining){
				row.toFirst = lockFirst;
			}
			else{
				row.toFirst = "X";
			}
		}
	}

	addRow(){
		this.rows.push(
			{
				points: 0,
				toFirst: 0,
				toSecond: 0,
				toThird: 0
			}
		);
	}
}
