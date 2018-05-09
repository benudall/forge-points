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
			toThird: 0,
			toFourth: 0,
			toFifth: 0
		};
	];

	sum = 0;
	remaining = 0;
	first = 0;
	second = 0;
	third = 0;
	fourth = 0;
	fifth = 0;
	sixth = 0;

	update() {
		this.sum = this.rows.reduce((a,b) => Number(a) + Number(b.points),0);
		this.remaining = this.max - this.sum;
		this.rows = this.rows.sort((a,b)=> b.points - a.points);

		this.first = this.rows[0].points;
		this.second = this.rows.length >= 2 ? this.rows[1].points : 0;
		this.third = this.rows.length >= 3 ? this.rows[2].points : 0;
		this.fourth = this.rows.length >= 4 ? this.rows[3].points : 0;
		this.fifth = this.rows.length >= 5 ? this.rows[4].points : 0;
		this.sixth = this.rows.length >= 6 ? this.rows[5].points : 0;

		for(let r in this.rows){
			let row = this.rows[r];

			if(row.points == this.first){
				row.toFirst = this.standardise((this.remaining - (row.points - this.second)) / 2);
				row.toSecond = "?";
				row.toThird = "?";
				row.toFourth = "?";
				row.toFifth = "?";
			}
			else if(row.points == this.second){
				row.toFirst = this.standardise(((this.first - row.points) + this.remaining) / 2);
				row.toSecond = this.standardise((this.remaining - (row.points - this.third)) / 2);
				row.toThird = "?";
				row.toFourth = "?";
				row.toFifth = "?";
			}
			else if(row.points == this.third){
				row.toFirst = this.standardise(((this.first - row.points) + this.remaining) / 2);
				row.toSecond = this.standardise(((this.second - row.points) + this.remaining) / 2);
				row.toThird = this.standardise((this.remaining - (row.points - this.fourth)) / 2);
				row.toFourth = "?";
				row.toFifth = "?";
			}
			else if(row.points == this.fourth){
				row.toFirst = this.standardise(((this.first - row.points) + this.remaining) / 2);
				row.toSecond = this.standardise(((this.second - row.points) + this.remaining) / 2);
				row.toThird = this.standardise(((this.third - row.points) + this.remaining) / 2);
				row.toFourth = this.standardise((this.remaining - (row.points - this.fifth)) / 2);
				row.toFifth = "?";
			}
			else if(row.points == this.fifth){
				row.toFirst = this.standardise(((this.first - row.points) + this.remaining) / 2);
				row.toSecond = this.standardise(((this.second - row.points) + this.remaining) / 2);
				row.toThird = this.standardise(((this.third - row.points) + this.remaining) / 2);
				row.toFourth = this.standardise(((this.fourth - row.points) + this.remaining) / 2);
				row.toFifth = this.standardise((this.remaining - (row.points - this.sixth)) / 2);
			}
			else{
				row.toFirst = this.standardise(((this.first - row.points) + this.remaining) / 2);
				row.toSecond = this.standardise(((this.second - row.points) + this.remaining) / 2);
				row.toThird = this.standardise(((this.third - row.points) + this.remaining) / 2);
				row.toFourth = this.standardise(((this.fourth - row.points) + this.remaining) / 2);
				row.toFifth = this.standardise(((this.fifth - row.points) + this.remaining) / 2);
			}
		}
	}
	standardise(x){
		x = Math.ceil(x);
		x = x <= 0 ? "🔒" : x;
		x = x > this.remaining ? "⛔" : x;
		return x;
	}

	addRow(){
		this.rows.push(
			{
				points: 0,
				toFirst: 0,
				toSecond: 0,
				toThird: 0,
				toFourth: 0,
				toFifth: 0
			}
		);
		this.update();
	}
}
