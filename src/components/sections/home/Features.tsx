'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Why Choose Our Premium Supplements?',
  subtitle:
    'Scientifically formulated vitamins and supplements designed to support your optimal health and wellness journey.',
  ctaText: 'Shop All Products',
  ctaHref: '/shop',
  features: [
    {
      icon: 'Shield',
      title: 'Third-Party Tested',
      description:
        'Every batch is independently tested for purity, potency, and safety to ensure the highest quality standards.',
    },
    {
      icon: 'Heart',
      title: 'Doctor Formulated',
      description:
        'Developed by healthcare professionals using evidence-based research and premium bioavailable ingredients.',
    },
    {
      icon: 'Zap',
      title: 'Fast Absorption',
      description:
        'Advanced delivery systems ensure maximum nutrient absorption and bioavailability for optimal results.',
    },
  ],
  benefits: [
    'Non-GMO and gluten-free formulations',
    'No artificial colors or preservatives',
    'Sustainably sourced ingredients',
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
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
    <section id="features" className="bg-background text-foreground py-16 lg:py-24">
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

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="bg-primary/10 text-primary rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-muted text-muted-foreground rounded-2xl p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="bg-primary/10 text-primary rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Quality You Can Trust
              </h3>
              <ul className="space-y-4">
                {config.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">
                      <span data-editable={`benefits[${idx}]`}>{benefit}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:text-center">
              <div className="bg-primary text-primary-foreground rounded-2xl p-8">
                <h4 className="text-xl font-semibold mb-4">
                  Ready to Start Your Wellness Journey?
                </h4>
                <p className="mb-6 opacity-90">
                  Discover our complete range of premium vitamins and supplements.
                </p>
                <Button
                  onClick={handleCTAClick}
                  className="bg-background text-foreground hover:bg-background/90 font-semibold"
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
