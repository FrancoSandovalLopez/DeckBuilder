import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RaceDao, RaceDto } from 'src/app/model/race.interface';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private context = 'assets/db/race.json';
  private selectedRaceSubject = new BehaviorSubject<number>(0);
  selectedRace$ = this.selectedRaceSubject.asObservable();

  constructor(private http: HttpClient) {}

  
  getRaces(): Observable<RaceDao[]>{
    return this.http.get<RaceDao[]>(this.context);
  }

  getRaceName(raceId: number): Observable<string> {
    return this.http.get<any[]>(this.context).pipe(
      map((races: any[]) => {
        const race = races.find((r) => r.id === raceId);
        return race ? race.name : 'Unknown';
      })
    );
  }

  selectRace(raceId: number): void {
    this.selectedRaceSubject.next(raceId);
  }
}
