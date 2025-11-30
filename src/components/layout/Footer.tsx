'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Shield, Award, CheckCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brandName: 'VitaHealth',
  brandDescription: 'Premium vitamins and supplements for your healthiest life',

  // Company Links
  companyTitle: 'Company',
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/story' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal Links
  legalTitle: 'Legal',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Social Media
  socialTitle: 'Follow Us',
  socialLinks: [
    { platform: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { platform: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  ],

  // Certifications
  certificationsTitle: 'Certifications',
  certifications: [
    { name: 'FDA Approved', icon: 'shield' },
    { name: 'GMP Certified', icon: 'award' },
    { name: 'Third-Party Tested', icon: 'checkCircle' },
  ],

  // Newsletter
  newsletterTitle: 'Stay Healthy',
  newsletterDescription: 'Get health tips and exclusive offers',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',

  // Copyright
  copyrightText: '© 2024 VitaHealth. All rights reserved.',

  // Contact Info
  contactEmail: 'hello@vitahealth.com',
  contactPhone: '1-800-VITAMINS',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      default:
        return Facebook;
    }
  };

  const getCertificationIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return Shield;
      case 'award':
        return Award;
      case 'checkCircle':
        return CheckCircle;
      default:
        return Shield;
    }
  };

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              <span data-editable="brandName">{config.brandName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              <span data-editable="brandDescription">{config.brandDescription}</span>
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold">
                <span data-editable="newsletterTitle">{config.newsletterTitle}</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
                data-form-id="692c2a50ebaf3f40193769e0"
              >
                <input
                  type="email"
                  placeholder={config.newsletterPlaceholder}
                  className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-editable="newsletterPlaceholder"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="companyTitle">{config.companyTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="legalTitle">{config.legalTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Certifications */}
          <div>
            {/* Social Media */}
            <h4 className="font-semibold mb-4">
              <span data-editable="socialTitle">{config.socialTitle}</span>
            </h4>
            <div className="flex gap-3 mb-6">
              {config.socialLinks.map((social, idx) => {
                const IconComponent = getSocialIcon(social.icon);
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    size="icon"
                    className="bg-background hover:bg-accent"
                    onClick={() => handleLinkClick(social.href)}
                    data-editable-href={`socialLinks[${idx}].href`}
                    data-href={social.href}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="sr-only" data-editable={`socialLinks[${idx}].platform`}>
                      {social.platform}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Certifications */}
            <h4 className="font-semibold mb-4">
              <span data-editable="certificationsTitle">{config.certificationsTitle}</span>
            </h4>
            <div className="space-y-3">
              {config.certifications.map((cert, idx) => {
                const IconComponent = getCertificationIcon(cert.icon);
                return (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <span data-editable={`certifications[${idx}].name`}>{cert.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </div>
          <div className="flex gap-6">
            <a
              href={`mailto:${config.contactEmail}`}
              className="hover:text-foreground transition-colors"
            >
              <span data-editable="contactEmail">{config.contactEmail}</span>
            </a>
            <a
              href={`tel:${config.contactPhone}`}
              className="hover:text-foreground transition-colors"
            >
              <span data-editable="contactPhone">{config.contactPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
