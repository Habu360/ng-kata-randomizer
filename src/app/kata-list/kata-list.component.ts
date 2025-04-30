import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IKata } from '../interfaces/kata.model';
import { IStyle } from '../interfaces/style.model';
import { ActivatedRoute } from '@angular/router';
import { IAction } from '../interfaces/action';
import { JsonDataService } from '../services/json-data.service';

@Component({
  selector: 'app-kata-list',
  templateUrl: './kata-list.component.html',
  styleUrls: ['./kata-list.component.css']
})
export class KataListComponent implements OnInit {
  @Input() selectedStyle: number = 0;
  @Input() selectedCategory: string = "";
  heading: string = "Kata List";
  katas: IKata[] = [];
  styles: IStyle[] = [];
  actions: IAction[] = [];
  kobudoActions: IAction[] = [];
  selectedKataId = 0;
  originalStyle: number = 0;
  selectedCategoryDisplay: string = "";
  selectedAction: string = "";
  
  constructor(private route: ActivatedRoute, private jsonDataService: JsonDataService) {};

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.jsonDataService.getData();
      this.styles = data.Styles;
      this.katas = data.Katas;
      this.actions = data.Actions;
      this.kobudoActions = data.KobudoActions;
    } catch (error) {
      console.log('Failed to load data');
    }

    this.route.params.subscribe((params) => {
      let temp = params['style'];
      this.selectedStyle =  temp === undefined ? 0 : Number(temp);
    });
    this.setHeadingText(this.selectedCategoryDisplay);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedStyle']) {
      // const currentValue = changes['selectedStyle'].currentValue;
      // const previousValue = changes['selectedStyle'].previousValue;
      // console.log(`selectedStyle changed from ${previousValue} to ${currentValue}`);

      this.setHeadingText(this.selectedCategoryDisplay);
    }
  }
  private setHeadingText(category: string) {
    let style = this.styles.find((style: IStyle) => style.id === this.selectedStyle);
    if (style != undefined) {
      this.heading = `${style.name} Kata List ${category}`;
    }
  }

  getFilteredKatas(): IKata[] {
    if (this.selectedStyle != this.originalStyle) {
      this.selectedCategory = "";
      this.originalStyle = this.selectedStyle;
    }

    return Number(this.selectedStyle) === 0
    ? []
    : this.selectedCategory === ""
      ? this.katas.filter((kata: IKata) => kata.styleid == Number(this.selectedStyle))
      : this.katas.filter((kata: IKata) => 
        kata.styleid == Number(this.selectedStyle) && kata.category == this.selectedCategory
      );
  }

  setSelectedCategory(category: string) {
    if (Number(this.selectedStyle) === 1 || Number(this.selectedStyle) === 4) {
      this.selectedCategory = "";
    }
    else {
      this.selectedCategory = category.toLowerCase();
    }
    
    switch (this.selectedCategory) {
      case "":
        this.selectedCategoryDisplay = "";
        break;
      case "long":
        this.selectedCategoryDisplay = "(longs)";
        break;
      case "short":
        this.selectedCategoryDisplay = "(shorts)";
        break;
    }

    this.setHeadingText(this.selectedCategoryDisplay);
    this.selectedAction = "";
  }

  randomize() {
    this.setAction();

    let temp = this.getFilteredKatas();

    if (temp.length > 0) {
      let min: number = temp[0].id;
      let max: number = temp[temp.length - 1].id;
      let kataId = Math.floor(Math.random() * (max - min + 1)) + min;
      let result = temp.find((kata: IKata) => Number(kata.id) === kataId);
      //console.log("found kata = " + result?.name);

      while (result === undefined) {
        kataId = Math.floor(Math.random() * (max - min + 1)) + min;
        result = temp.find((kata: IKata) => Number(kata.id) === kataId);
        //console.log("check again, found kata = " + result?.name);
      }
      this.selectedKataId = kataId;
      //console.log("finally - kata id = " + this.selectedKataId);
    }
  }
  private setAction() {
    let prevAction = this.selectedAction;
    if (this.actions.length > 0) {
      let min: number = this.actions[0].id;
      let max: number = this.actions[this.actions.length - 1].id;
      let actionId = Math.floor(Math.random() * (max - min + 1)) + min;
      let result = this.actions.find((action: IAction) => Number(action.id) === actionId);
      let currAction = result === undefined ? "" : `Action: ${result.name}`;

      while (prevAction === currAction) {
        actionId = Math.floor(Math.random() * (max - min + 1)) + min;
        result = this.actions.find((action: IAction) => Number(action.id) === actionId);
        currAction = result === undefined ? "" : `Action: ${result.name}`;
      }
      this.selectedAction = currAction;
    }
  }
  shouldHideFilters(): boolean {
    return this.selectedStyle === 1 || this.selectedStyle === 4 ? true : false;
  }
}
