import { Component, OnInit } from '@angular/core';
import { IStyle } from '../interfaces/style.model';
import { Router } from '@angular/router';
import { JsonDataService } from '../services/json-data.service';

@Component({
  selector: 'app-style-list',
  templateUrl: './style-list.component.html',
  styleUrls: ['./style-list.component.css']
})
export class StyleListComponent implements OnInit {

  heading: string = "Select a Style";
  styles: IStyle[] = [];
  styleFilter: number = 0;
  categoryFilter: string = "";
  selectedStyle: number = 0;
  selectedCategory: string = "";

  constructor(private router: Router, private jsonDataService: JsonDataService) {};

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.jsonDataService.getData();
      this.styles = data.Styles;
    } catch (error) {
      console.log('Failed to load data');
    }
  }

  setSelectedStyle(id: number) {
    this.selectedStyle = id;
    this.selectedCategory = "";
    //console.log(this.selectedStyle);
    this.router.navigate(['/kata/', id]);
  }
}
