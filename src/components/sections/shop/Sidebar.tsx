'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  ShoppingBag,
  Heart,
  Pill,
  Shield,
  Star,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_SIDEBAR = {
  title: 'VitaHealth Store',
  subtitle: 'Premium Supplements',
  navigationItems: [
    { label: 'Home', href: '/', icon: 'Home' },
    { label: 'Shop', href: '/shop', icon: 'ShoppingBag' },
    { label: 'About Us', href: '/about', icon: 'Heart' },
  ],
  categories: [
    { name: 'Multivitamins', count: 24, href: '/shop/multivitamins' },
    { name: 'Vitamin D', count: 18, href: '/shop/vitamin-d' },
    { name: 'Vitamin C', count: 15, href: '/shop/vitamin-c' },
  ],
  features: [
    { title: 'Premium Quality', description: 'Lab-tested supplements', icon: 'Shield' },
    { title: 'Expert Approved', description: 'Healthcare professional recommended', icon: 'Star' },
  ],
  promoText: 'Free shipping on orders over $50',
  ctaText: 'Browse All Products',
  ctaHref: '/shop',
} as const;

type SidebarProps = Partial<typeof DEFAULT_SIDEBAR>;

export default function Sidebar(props: SidebarProps) {
  const config = { ...DEFAULT_SIDEBAR, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (iconName: string) => {
    const icons = {
      Home: Home,
      ShoppingBag: ShoppingBag,
      Heart: Heart,
      Pill: Pill,
      Shield: Shield,
      Star: Star,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Home;
    return <IconComponent className="h-4 w-4" />;
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCategoryClick = (href: string) => {
    navigate(href);
  };

  return (
    <section id="sidebar" className="bg-background text-foreground">
      {/* Mobile Toggle */}
      <div className="lg:hidden p-4 border-b border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <Filter className="h-4 w-4" />
          <span>Filters & Navigation</span>
          {isOpen ? <X className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar Content */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} lg:block bg-card text-card-foreground border-r border-border h-full`}
      >
        <div className="p-6 space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Pill className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">
                <span data-editable="title">{config.title}</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Navigation
            </h3>
            {config.navigationItems.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full justify-start space-x-3 hover:bg-accent hover:text-accent-foreground"
                onClick={() => handleNavigation(item.href)}
                data-editable-href={`navigationItems[${idx}].href`}
                data-href={item.href}
              >
                {getIcon(item.icon)}
                <span data-editable={`navigationItems[${idx}].label`}>{item.label}</span>
              </Button>
            ))}
          </nav>

          <Separator />

          {/* Product Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Categories
            </h3>
            {config.categories.map((category, idx) => (
              <Card
                key={idx}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => handleCategoryClick(category.href)}
                data-editable-href={`categories[${idx}].href`}
                data-href={category.href}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium" data-editable={`categories[${idx}].name`}>
                      {category.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      <span data-editable={`categories[${idx}].count`}>{category.count}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Why Choose Us
            </h3>
            {config.features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <div className="text-primary mt-0.5">{getIcon(feature.icon)}</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium" data-editable={`features[${idx}].title`}>
                    {feature.title}
                  </h4>
                  <p
                    className="text-xs text-muted-foreground"
                    data-editable={`features[${idx}].description`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Promo Banner */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4 text-center space-y-3">
              <p className="text-sm font-medium">
                <span data-editable="promoText">{config.promoText}</span>
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => navigate(config.ctaHref)}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
