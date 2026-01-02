export interface Course {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  brochureLink: string;
  enrollLink: string;
  category: 'fashion' | 'computer' | 'multimedia' | 'photography' | 'beautician' | 'spoken-english'; // Updated categories
  icon?: React.ElementType; // Optional icon for dropdowns
  duration: string;
  eligibility: string;
  learningOutcomes: string[];
  careerProspects: string[];
  modules: { title: string; description: string; }[];
}

// The initialCourses array has been removed.
// Courses will now be fetched exclusively from the Supabase database.
export const initialCourses: Course[] = [];