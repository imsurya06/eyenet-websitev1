import { Image } from 'lucide-react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'fashion' | 'infrastructure' | 'event' | 'general';
}

export const initialGalleryImages: GalleryImage[] = [
  // Images from GalleryCarouselSection
  { id: 'carousel-1', src: '/images/img1.png', alt: 'South Indian Designer Concert 1', category: 'event' },
  { id: 'carousel-2', src: '/images/img2.png', alt: 'South Indian Designer Concert 2', category: 'event' },
  { id: 'carousel-3', src: '/images/img3.png', alt: 'South Indian Designer Concert 3', category: 'event' },
  { id: 'carousel-4', src: '/images/img4.png', alt: 'South Indian Designer Concert 4', category: 'event' },

  // Images from GalleryGridSection
  { id: 'grid-1', src: '/images/img5.png', alt: 'Traditional attire model 3', category: 'fashion' },
  { id: 'grid-2', src: '/images/img6.png', alt: 'Traditional attire model 4', category: 'fashion' },
  { id: 'grid-3', src: '/images/img7.png', alt: 'Studio portrait model', category: 'fashion' },
  { id: 'grid-4', src: '/public/placeholder.svg', alt: 'Placeholder image', category: 'general' },
  { id: 'grid-5', src: '/public/placeholder.svg', alt: 'Placeholder image', category: 'general' },
  { id: 'grid-6', src: '/public/placeholder.svg', alt: 'Placeholder image', category: 'general' },

  // Images from ImageGallerySection (Home page)
  { id: 'home-gallery-1', src: '/images/img1.png', alt: 'Traditional attire model 1', category: 'fashion' },
  { id: 'home-gallery-2', src: '/images/img2.png', alt: 'Fashion show model 1', category: 'fashion' },
  { id: 'home-gallery-3', src: '/images/img3.png', alt: 'Traditional attire model 2', category: 'fashion' },
  { id: 'home-gallery-4', src: '/images/img4.png', alt: 'Fashion show model 2', category: 'fashion' },
  { id: 'home-gallery-5', src: '/images/img5.png', alt: 'Traditional attire model 3', category: 'fashion' },
  { id: 'home-gallery-6', src: '/images/img6.png', alt: 'Traditional attire model 4', category: 'fashion' },
  { id: 'home-gallery-7', src: '/images/img7.png', alt: 'Studio portrait model', category: 'fashion' },

  // Images from InfrastructureHeroSection and InfrastructureGridSection
  { id: 'infra-1', src: '/images/pexels-pixabay-256491.jpg', alt: 'Computer Lab', category: 'infrastructure' },
  { id: 'infra-2', src: '/images/pexels-tima-miroshnichenko-6550407.jpg', alt: 'Classroom', category: 'infrastructure' },
  { id: 'infra-3', src: '/images/pexels-pixabay-356065.jpg', alt: 'Library', category: 'infrastructure' },
  { id: 'infra-4', src: '/images/pexels-gabriel-manjarres-119584478-19064143.jpg', alt: 'Student in classroom', category: 'infrastructure' },
  { id: 'infra-5', src: '/images/pexels-meruyert-gonullu-7317589.jpg', alt: 'Lecture Hall', category: 'infrastructure' },
  { id: 'infra-6', src: '/images/pexels-george-pak-7972494.jpg', alt: 'Students studying outdoors', category: 'infrastructure' },
  { id: 'infra-7', src: '/images/pexels-yankrukov-8197513.jpg', alt: 'Professor in lecture hall', category: 'infrastructure' },
  { id: 'infra-8', src: '/images/pexels-rdne-8499580.jpg', alt: 'Campus Building', category: 'infrastructure' },
  { id: 'infra-9', src: '/images/pexels-pixabay-256395.jpg', alt: 'Empty classroom', category: 'infrastructure' },
];