export interface Report {
  id: number
  title: string
  user_id: number
  overall_score: number
  date: string
  fit_score: number
  color_score: number
  quality_score: number
  total_reviews: number
  fit_reviews: number
  color_reviews: number
  quality_reviews: number
}