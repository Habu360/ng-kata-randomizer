import { Component, OnInit } from '@angular/core';
import { JsonDataService } from '../services/json-data.service';
import { IQuote } from '../interfaces/quote.model';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: IQuote[] = [];

  constructor(private jsonDataService: JsonDataService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.jsonDataService.getData();
      this.quotes = data.Quotes;
    } catch (error) {
      console.log('Failed to load data');
    }
  }
}
