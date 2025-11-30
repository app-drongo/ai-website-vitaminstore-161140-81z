'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Shield, Gift, Zap } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_NEWSLETTER = {
  title: 'Stay Healthy with Expert Insights',
  subtitle:
    'Get the latest vitamin research, health tips, and exclusive supplement offers delivered to your inbox',
  emailPlaceholder: 'Enter your email address',
  ctaText: 'Subscribe Now',
  privacyText: 'We respect your privacy. Unsubscribe at any time.',
  benefits: [
    'Weekly health tips from certified nutritionists',
    'Early access to new vitamin formulations',
    'Exclusive discounts on premium supplements',
  ],
  features: [
    { icon: 'Shield', text: 'Science-backed content' },
    { icon: 'Gift', text: 'Subscriber-only deals' },
    { icon: 'Zap', text: 'Weekly delivery' },
  ],
  successMessage: 'Thank you! Check your email to confirm your subscription.',
  errorMessage: 'Please enter a valid email address.',
} as const;

type NewsletterProps = Partial<typeof DEFAULT_NEWSLETTER>;

export default function Newsletter(props: NewsletterProps) {
  const config = { ...DEFAULT_NEWSLETTER, ...props };
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="h-5 w-5" />;
      case 'Gift':
        return <Gift className="h-5 w-5" />;
      case 'Zap':
        return <Zap className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="newsletter" className="bg-muted/30 text-foreground py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="bg-card text-card-foreground border-border shadow-lg">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
                <Mail className="h-8 w-8" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span data-editable="title">{config.title}</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Benefits List */}
            <div className="mb-8">
              <ul className="space-y-3">
                {config.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground" data-editable={`benefits[${idx}]`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="text-primary">{getIcon(feature.icon)}</div>
                  <span className="text-sm font-medium" data-editable={`features[${idx}].text`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-form-id="692c2a6debaf3f40193769e3"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={config.emailPlaceholder}
                  className="flex-1 bg-background text-foreground border-border"
                  disabled={status === 'loading' || status === 'success'}
                  data-editable="emailPlaceholder"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                >
                  <span data-editable="ctaText">
                    {status === 'loading' ? 'Subscribing...' : config.ctaText}
                  </span>
                </Button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="p-4 bg-accent/20 text-accent-foreground rounded-lg border border-accent/30">
                  <span data-editable="successMessage">{config.successMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-destructive/20 text-destructive rounded-lg border border-destructive/30">
                  <span data-editable="errorMessage">{config.errorMessage}</span>
                </div>
              )}

              {/* Privacy Notice */}
              <p className="text-sm text-muted-foreground text-center">
                <span data-editable="privacyText">{config.privacyText}</span>
              </p>
            </form>

            {/* Trust Badge */}
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
