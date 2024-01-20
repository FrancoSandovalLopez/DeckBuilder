import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CardDao } from '../../model/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private context = 'assets/db/cards.json';
  constructor(private http: HttpClient) { }

  getCards(): Observable<CardDao[]>{
    return this.http.get<CardDao[]>(this.context);
  }

  getCardsByName(cardName: string): Observable<CardDao[]>{
    return this.http.get<CardDao[]>(this.context).pipe(
      map(items => items.filter(item => item.name.toLowerCase().includes(cardName.toLowerCase())))
    );
  }

  getCardsByRace(idRace: number): Observable<CardDao[]>{
    return this.http.get<CardDao[]>(this.context).pipe(
      map(items => items.filter(item => item.race === idRace))
    );
  }
}
