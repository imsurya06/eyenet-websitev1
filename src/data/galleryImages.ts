export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'fashion' | 'event' | 'general'; // Removed 'infrastructure' from category type
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
  // Removed placeholder images: grid-4, grid-5, grid-6

  // Images from ImageGallerySection (Home page)
  { id: 'home-gallery-1', src: '/images/img1.png', alt: 'Traditional attire model 1', category: 'fashion' },
  { id: 'home-gallery-2', src: '/images/img2.png', alt: 'Fashion show model 1', category: 'fashion' },
  { id: 'home-gallery-3', src: '/images/img3.png', alt: 'Traditional attire model 2', category: 'fashion' },
  { id: 'home-gallery-4', src: '/images/img4.png', alt: 'Fashion show model 2', category: 'fashion' },
  { id: 'home-gallery-5', src: '/images/img5.png', alt: 'Traditional attire model 3', category: 'fashion' },
  { id: 'home-gallery-6', src: '/images/img6.png', alt: 'Traditional attire model 4', category: 'fashion' },
  { id: 'home-gallery-7', src: '/images/img7.png', alt: 'Studio portrait model', category: 'fashion' },
];