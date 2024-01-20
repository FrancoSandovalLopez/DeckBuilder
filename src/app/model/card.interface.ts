export interface CardDto {
    id: number;
    name: string;
    edition: string;
    rarity: string;
    type: string;
    race: string;
    cost: number;
    ability: string;
    illustrator: string;
    image: string;
    points: number;
    unique: boolean;
  }

  export interface CardDao {
    id: number;
    name: string;
    edition: number;
    rarity: number;
    type: number;
    race: number;
    cost: number;
    ability: string;
    illustrator: string;
    image: string;
    points: number;
    unique: boolean;
  }

