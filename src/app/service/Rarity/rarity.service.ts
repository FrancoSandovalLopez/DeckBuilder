import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RarityService {
  private context = 'assets/db/rarity.json';
  constructor(private http: HttpClient) {}

  getRarityName(rarityId: number): Observable<string> {
    return this.http.get<any[]>(this.context).pipe(
      map((rarities: any[]) => {
        const rarity = rarities.find((r) => r.id === rarityId);
        return rarity ? rarity.name : 'Unknown';
      })
    );
  }
}
