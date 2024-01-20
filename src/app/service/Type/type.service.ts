import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TypeDao } from 'src/app/model/type.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private context = 'assets/db/type.json';
  private selectedTypeSubject = new BehaviorSubject<number>(0);
  selectedType$ = this.selectedTypeSubject.asObservable();


  constructor(private http: HttpClient) {}

  getTypeName(typeId: number): Observable<string> {
    return this.http.get<any[]>(this.context).pipe(
      map((types: any[]) => {
        const type = types.find((r) => r.id === typeId);
        return type ? type.name : 'Unknown';
      })
    );
  }

  getTypes(): Observable<TypeDao[]>{
    return this.http.get<TypeDao[]>(this.context);
  }

  selectType(typeId: number): void {
    this.selectedTypeSubject.next(typeId);
  }
}
