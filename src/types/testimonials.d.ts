export interface TestimonialData {
  title: string;
  description: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  author: string;
  comment: string;
  stars: number;
}
