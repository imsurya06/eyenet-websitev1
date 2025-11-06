import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PencilRuler, Clock, Monitor, ClipboardList, Briefcase, DollarSign } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

interface FAQSectionProps {
  id?: string; // Added id prop
}

const FAQSection: React.FC<FAQSectionProps> = ({ id }) => {
  const faqs = [
    {
      icon: PencilRuler,
      question: 'What programs do you offer?',
      answer: 'We provide comprehensive design programs in fashion, graphic, interior, and textile design.',
    },
    {
      icon: Clock,
      question: 'How long are the courses?',
      answer: 'Course durations range from short workshops to full-time diploma and degree programs.',
    },
    {
      icon: Monitor,
      question: 'Are online options available?',
      answer: 'Yes, we offer flexible online and hybrid learning options for many programs.',
    },
    {
      icon: ClipboardList,
      question: 'What are the admission requirements?',
      answer: 'Requirements vary by program, but typically include a portfolio and academic qualifications.',
    },
    {
      icon: Briefcase,
      question: 'Do you offer career support?',
      answer: 'We provide comprehensive career guidance, portfolio development, and industry networking.',
    },
    {
      icon: DollarSign,
      question: 'How much do programs cost?',
      answer: 'Tuition varies by program. We offer scholarships and flexible payment options.',
    },
  ];

  return (
    <section id={id} className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-center">
      <AnimateOnScroll delay={100}>
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-foreground">
          FAQs
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
          Common questions about our design programs and admission process.
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <AnimateOnScroll key={index} delay={300 + index * 100}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-primary">
                <faq.icon className="h-6 w-6" />
              </div>
              <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-2 text-foreground">
                {faq.question}
              </h3>
              <p className="text-text-regular font-body text-gray-600 max-w-xs">
                {faq.answer}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      <div className="mt-16">
        <AnimateOnScroll delay={100}>
          <h3 className="text-h3-mobile md:text-h3-desktop font-heading mb-4 text-foreground">
            Need more information?
          </h3>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-8 max-w-xl mx-auto">
            Our admissions team is ready to answer your specific questions.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={300}>
          <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/contact">Contact</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FAQSection;