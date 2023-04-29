import { Category } from "./category";

export interface Review {
  dataset_id: number,
  review_number: number,
  review_text: string,
  categories: Category[],
  prediction: string,
  fit_score: string,
  color_score: string,
  quality_score: string
}