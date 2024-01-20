import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  forkJoin,
  map,
  of,
  race,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CardDao, CardDto } from 'src/app/model/card.interface';
import { CardService } from 'src/app/service/Card/card.service';
import { RarityService } from 'src/app/service/Rarity/rarity.service';
import { EditionService } from 'src/app/service/Edition/edition.service';
import { TypeService } from 'src/app/service/Type/type.service';
import { RaceService } from 'src/app/service/Race/race.service';
import { mapCardDaoToDto } from 'src/app/utils/mappers';

@Component({
  selector: 'app-busqueda-cartas',
  templateUrl: './busqueda-cartas.component.html',
  styleUrls: ['./busqueda-cartas.component.scss'],
})
export class BusquedaCartasComponent implements OnInit {
  cards: CardDto[] = [];
  filteredCards: CardDto[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private cardService: CardService,
    private rarityService: RarityService,
    private editionService: EditionService,
    private typeService: TypeService,
    private raceService: RaceService
  ) {}

  ngOnInit() {
    this.loadCards();

    this.raceService.selectedRace$
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedRaceId) => {
        if (selectedRaceId === 0) {
          // If '0' is used to indicate no selection, show all cards
          this.cardService
            .getCards()
            .pipe(
              switchMap((cards: CardDao[]) =>
                forkJoin(
                  cards.map((cardDao) =>
                    forkJoin({
                      edition: this.editionService.getEditionName(
                        cardDao.edition
                      ),
                      rarity: this.rarityService.getRarityName(cardDao.rarity),
                      type: this.typeService.getTypeName(cardDao.type),
                      race: this.raceService.getRaceName(cardDao.race),
                    }).pipe(
                      map(({ edition, rarity, type, race }) =>
                        mapCardDaoToDto(cardDao, edition, rarity, type, race)
                      )
                    )
                  )
                )
              )
            )
            .subscribe((cardDtos: CardDto[]) => {
              // Now you have an array of CardDto
              this.cards = cardDtos;
            });
        } else {
          // Filter cards based on the selected race
          // this.filteredCards = this.cards.filter(
          //   (card) => card. === selectedRaceId
          // );

          this.cardService
            .getCardsByRace(selectedRaceId)
            .pipe(
              switchMap((cards: CardDao[]) =>
                forkJoin(
                  cards.map((cardDao) =>
                    forkJoin({
                      edition: this.editionService.getEditionName(
                        cardDao.edition
                      ),
                      rarity: this.rarityService.getRarityName(cardDao.rarity),
                      type: this.typeService.getTypeName(cardDao.type),
                      race: this.raceService.getRaceName(cardDao.race),
                    }).pipe(
                      map(({ edition, rarity, type, race }) =>
                        mapCardDaoToDto(cardDao, edition, rarity, type, race)
                      )
                    )
                  )
                )
              )
            )
            .subscribe((cardDtos: CardDto[]) => {
              // Now you have an array of CardDto
              this.cards = cardDtos;
            });
        }
      });
  }

  loadCards() {
    this.cardService
      .getCards()
      .pipe(
        switchMap((cards: CardDao[]) =>
          forkJoin(
            cards.map((cardDao) =>
              forkJoin({
                edition: this.editionService.getEditionName(cardDao.edition),
                rarity: this.rarityService.getRarityName(cardDao.rarity),
                type: this.typeService.getTypeName(cardDao.type),
                race: this.raceService.getRaceName(cardDao.race),
              }).pipe(
                map(({ edition, rarity, type, race }) =>
                  mapCardDaoToDto(cardDao, edition, rarity, type, race)
                )
              )
            )
          )
        )
      )
      .subscribe((cardDtos: CardDto[]) => {
        // Now you have an array of CardDto
        this.cards = cardDtos;
      });
  }

  onSearchCard(event: Event): void {
    // Access the input value
    const inputValue = (event.target as HTMLInputElement).value;

    if (!inputValue) this.cards = [];

    this.cardService.getCardsByName(inputValue).subscribe((data) => {
      this.cards = [];

      data.forEach((card) => {
        forkJoin({
          rarity: this.rarityService.getRarityName(card.rarity),
          edition: this.editionService.getEditionName(card.edition), // Assuming you have a service to get edition
          type: this.typeService.getTypeName(card.type), // Assuming you have a service to get type
          race: this.raceService.getRaceName(card.race),
          // You can add more attributes here if needed
        }).subscribe({
          next: (data: { edition: any; type: any; rarity: any; race: any }) => {
            const cardDto: CardDto = {
              id: card.id,
              name: card.name,
              ability: card.ability,
              cost: card.cost,
              edition: data.edition,
              illustrator: card.illustrator,
              image: card.image,
              type: data.type,
              rarity: data.rarity,
              race: data.race,
              points: card.points,
              unique: card.unique,
            };
            this.cards.push(cardDto);
          },
        });
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
