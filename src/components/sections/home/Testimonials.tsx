'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_TESTIMONIALS = {
  title: 'What Our Customers Say',
  subtitle: 'Real results from real people who trust our premium vitamins and supplements',
  testimonials: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content:
        'Since starting with their Vitamin D3 supplements, my energy levels have improved dramatically. I feel more focused and healthier overall.',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      imageAlt: 'Sarah Johnson testimonial photo',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      role: 'Healthcare Professional',
      content:
        'I recommend these supplements to my patients. The quality is exceptional and the results speak for themselves. Truly premium products.',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      imageAlt: 'Dr. Michael Chen testimonial photo',
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Working Mother',
      content:
        'The multivitamin pack has been a game-changer for my busy lifestyle. I have more energy to keep up with my kids and work demands.',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      imageAlt: 'Emma Rodriguez testimonial photo',
    },
  ],
  ctaText: 'Start Your Health Journey',
  ctaHref: '/shop',
  trustBadge: 'Trusted by 50,000+ customers worldwide',
} as const;

type TestimonialsProps = Partial<typeof DEFAULT_TESTIMONIALS>;

export default function Testimonials(props: TestimonialsProps) {
  const config = { ...DEFAULT_TESTIMONIALS, ...props };
  const navigate = useSmartNavigation();

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {config.testimonials.map((testimonial, idx) => (
            <Card
              key={testimonial.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary opacity-60" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  <span data-editable={`testimonials[${idx}].content`}>
                    "{testimonial.content}"
                  </span>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.imageAlt}
                      fill
                      className="object-cover"
                      data-editable-src={`testimonials[${idx}].imageUrl`}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      <span data-editable={`testimonials[${idx}].name`}>{testimonial.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`testimonials[${idx}].role`}>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge & CTA */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground font-medium">
              <span data-editable="trustBadge">{config.trustBadge}</span>
            </p>
          </div>

          <Button
            onClick={handleCtaClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold transition-colors duration-200"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
