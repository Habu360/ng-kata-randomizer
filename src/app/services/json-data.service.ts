import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IJsonData } from '../interfaces/jsonData.model';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  private dataUrl: string = 'assets/karatedata.json';
  private cache: IJsonData | null = null;

  constructor(private http: HttpClient) { }

  async getData(): Promise<IJsonData> {
    if (this.cache) {
      //return cached data if available
      return this.cache;
    }

    const data = await firstValueFrom(this.http.get<IJsonData>(this.dataUrl));
    this.cache = data;
    return data;
  }

  //clear cache if necessary (i.e. logout, refresh, etc.)
  clearCache() {
    this.cache = null;
  }
}
