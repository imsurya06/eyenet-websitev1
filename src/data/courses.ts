import { Image, HardDrive } from 'lucide-react';

export interface Course {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  brochureLink: string;
  enrollLink: string;
  category: 'fashion' | 'computer';
  icon?: React.ElementType; // Optional icon for dropdowns
}

export const allCourses: Course[] = [
  // Fashion Design Courses
  {
    id: 'diploma-in-fashion-designing',
    image: '/images/img1.png',
    tag: 'Course',
    title: 'Diploma in Fashion Designing',
    description: 'A Diploma in Fashion Designing is a specialized program designed to equip students with the skills and Details...',
    brochureLink: '/brochures/Course-details-v1.pdf',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'diploma-in-dress-making-female',
    image: '/images/img2.png',
    tag: 'Course',
    title: 'Diploma in Dress Making (Female)',
    description: 'A six-month Diploma in Female Dress Making is an accelerated program designed to provide. Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'diploma-in-dress-making-child',
    image: '/images/img3.png',
    tag: 'Course',
    title: 'Diploma in Dress Making (Child)',
    description: 'A six-month Diploma in Kids Dress Making is a focused program designed to teach the specific Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'chudithar-making',
    image: '/images/img4.png',
    tag: 'Course',
    title: 'Chudithar Making',
    description: 'A Churithar Making Course is a specialized program designed to teach the skills required to Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'blouse-making',
    image: '/images/img5.png',
    tag: 'Course',
    title: 'Blouse Making',
    description: 'A Blouse Making Course is a specialized program designed to teach the skills and Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'drafting-pattern-making',
    image: '/images/img6.png',
    tag: 'Course',
    title: 'Drafting & Pattern Making',
    description: 'A Drafting & Pattern Making Course is a specialized program designed to teach the Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'aari-making-course',
    image: '/images/img7.png',
    tag: 'Course',
    title: 'Aari Making Course',
    description: 'An Aari Making Course is a specialized program designed to teach the intricate art of Aari Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'fashion-illustration-course',
    image: '/images/img8.png',
    tag: 'Course',
    title: 'Fashion Illustration Course',
    description: 'A Fashion Illustration Course is a specialized program designed to teach the art of drawing Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },
  {
    id: 'fabric-painting-course',
    image: '/images/img9.png',
    tag: 'Course',
    title: 'Fabric Painting Course',
    description: 'A Fabric Painting Course is a creative program designed to teach the techniques and skills Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'fashion',
    icon: Image,
  },

  // Computer Courses
  {
    id: 'computer-basics-applications',
    image: '/images/img001.png',
    tag: 'Course',
    title: 'Computer Basics & Applications',
    description: 'Computer concepts, Windows, Networking principles, Microsoft office, C, C++ Programming. Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'computer',
    icon: HardDrive,
  },
  {
    id: 'web-designing',
    image: '/images/img002.png',
    tag: 'Course',
    title: 'Web Designing',
    description: 'Computer Basics, MS-front Page, Dreamweaver, HTML, Gif animation, Photoshop. Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'computer',
    icon: HardDrive,
  },
  {
    id: 'photoshop-mastery',
    image: '/images/img003.png',
    tag: 'Course',
    title: 'Photoshop Mastery',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'computer',
    icon: HardDrive,
  },
  {
    id: 'computer-application-programming',
    image: '/images/img004.png',
    tag: 'Course',
    title: 'Computer Application & Programming',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. Details...',
    brochureLink: '#',
    enrollLink: '/admissions',
    category: 'computer',
    icon: HardDrive,
  },
];