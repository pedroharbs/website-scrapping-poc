export type Link = {
  domain: string;
  path: string;
  query?: string;
  url: () => string;
}

export type Links = {
  js: Link[];
  css: Link[];
  images: Link[];
  others: Link[];
}