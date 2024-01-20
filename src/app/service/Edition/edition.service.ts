import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  private context = 'assets/db/edition.json';
  constructor(private http: HttpClient) {}

  

  getEditionName(editionId: number): Observable<string> {
    return this.http.get<any[]>(this.context).pipe(
      map((editions: any[]) => {
        const edition = editions.find((r) => r.id === editionId);
        return edition ? edition.name : 'Unknown';
      })
    );
  }

}
