'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Zap, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_BENEFITS = {
  title: 'Why Choose Our Premium Supplements?',
  subtitle:
    'Experience the difference with scientifically-backed nutrition that supports your wellness journey',
  ctaText: 'Shop Now',
  ctaHref: '/shop',
  benefits: [
    {
      icon: 'Shield',
      title: 'Third-Party Tested',
      description:
        "Every batch is independently tested for purity, potency, and safety to ensure you get exactly what's on the label",
    },
    {
      icon: 'Heart',
      title: 'Science-Backed Formulas',
      description:
        'Our supplements are formulated based on the latest nutritional research and clinical studies for maximum effectiveness',
    },
    {
      icon: 'Zap',
      title: 'High Bioavailability',
      description:
        'Advanced absorption technology ensures your body can effectively utilize the nutrients for optimal health benefits',
    },
    {
      icon: 'Award',
      title: 'Premium Quality',
      description:
        'Made in FDA-registered facilities with the highest quality standards and pharmaceutical-grade ingredients',
    },
  ],
  features: [
    'Non-GMO and gluten-free formulations',
    'No artificial colors or preservatives',
    'Sustainably sourced ingredients',
  ],
} as const;

type BenefitsProps = Partial<typeof DEFAULT_BENEFITS>;

export default function Benefits(props: BenefitsProps) {
  const config = { ...DEFAULT_BENEFITS, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const iconMap = {
      Shield: Shield,
      Heart: Heart,
      Zap: Zap,
      Award: Award,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Shield;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="benefits" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {config.benefits.map((benefit, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  <span data-editable={`benefits[${idx}].title`}>{benefit.title}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`benefits[${idx}].description`}>{benefit.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-muted/50 rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-8">
              Additional Quality Assurances
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    <span data-editable={`features[${idx}]`}>{feature}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold group"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
