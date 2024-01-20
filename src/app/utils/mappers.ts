// src/app/utils/card-mapper.ts

import { CardDao, CardDto } from '../model/card.interface';

export function mapCardDaoToDto(
  cardDao: CardDao, 
  edition: string, 
  rarity: string, 
  type: string, 
  race: string
): CardDto {
  return {
    id: cardDao.id,
    name: cardDao.name,
    edition: edition,
    rarity: rarity,
    type: type,
    race: race,
    cost: cardDao.cost,
    ability: cardDao.ability,
    illustrator: cardDao.illustrator,
    image: cardDao.image,
    points: cardDao.points,
    unique: cardDao.unique
  };
}
