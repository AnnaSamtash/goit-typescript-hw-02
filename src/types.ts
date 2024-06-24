export interface Image {
  id: number;
  urls: {
    regular: string;
    small: string;
  };
  description: string;
}
