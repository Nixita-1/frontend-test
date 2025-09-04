interface Event {
  event_id: number,
  provider: string
}

interface Launch {
  launch_id: string,
  provider: string
}

interface Author {
  id: number,
  name: string
}

export interface Post {
  id: number,
  title: string,
  authors: Author[],
  url: string,
  image_url: string,
  news_site: string,
  summary: string,
  published_at: string,
  updated_at: string,
  featured: boolean,
  launches: Launch[],
  events: Event[]
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
