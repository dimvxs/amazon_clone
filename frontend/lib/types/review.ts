export interface Review {
  id: number;
  userName: string;
  title: string;
  date: string;
  country: string;
  fullText: string;
  helpfulCount: number;
  images: string[];
}