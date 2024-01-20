import { Component } from '@angular/core';
import { map, race } from 'rxjs';
import { RaceDao, RaceDto } from 'src/app/model/race.interface';
import { TypeDao, TypeDto } from 'src/app/model/type.interface';
import { RaceService } from 'src/app/service/Race/race.service';
import { TypeService } from 'src/app/service/Type/type.service';

@Component({
  selector: 'app-filtro-cartas',
  templateUrl: './filtro-cartas.component.html',
  styleUrls: ['./filtro-cartas.component.scss'],
})
export class FiltroCartasComponent {
  races: RaceDto[] = [];
  types: TypeDto[] = [];

  constructor(private raceService: RaceService, private typeService: TypeService) {}

  ngOnInit() {
    this.LoadRaces();
    this.LoadTypes();
  }

  LoadRaces() {
    this.raceService
      .getRaces()
      .pipe(
        map((races: RaceDao[]) =>
          races.map((races) => ({
            id: races.id,
            name: races.name,
          }))
        )
      )
      .subscribe((transformed: RaceDto[]) => {
        this.races = transformed;
      });
  }

  LoadTypes() {
    this.typeService
      .getTypes()
      .pipe(
        map((types: TypeDao[]) =>
          types.map((types) => ({
            id: types.id,
            name: types.name,
          }))
        )
      )
      .subscribe((transformed: TypeDto[]) => {
        this.types = transformed;
      });
  }

  SearchByRace(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const raceId = parseInt(selectElement.value, 10);
    this.raceService.selectRace(raceId);
  }

  SearchByType(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const raceId = parseInt(selectElement.value, 10);
    this.typeService.selectType(raceId);
  }
}
