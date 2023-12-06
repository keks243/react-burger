export interface IngredientTypes {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  uniqId: string;
  __v: number;
}

export interface BunTypes {
  _id: string;
  uniqId: string;
  type: string;
  name: string;
  image: string;
  price: number;
}
