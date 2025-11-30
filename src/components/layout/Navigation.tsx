'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Heart, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'VitaHealth',
  brandTagline: 'Premium vitamins and supplements for your healthiest life',
  homeLabel: 'Home',
  homeHref: '/',
  shopLabel: 'Shop',
  shopHref: '/shop',
  cartLabel: 'Cart',
  cartHref: '/cart',
  accountLabel: 'Account',
  accountHref: '/account',
  wishlistLabel: 'Wishlist',
  wishlistHref: '/wishlist',
  ctaText: 'Shop Now',
  ctaHref: '/shop',
  mobileMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: config.homeLabel, href: config.homeHref },
    { label: config.shopLabel, href: config.shopHref },
  ];

  const actionItems = [
    { icon: Heart, label: config.wishlistLabel, href: config.wishlistHref },
    { icon: ShoppingCart, label: config.cartLabel, href: config.cartHref },
    { icon: User, label: config.accountLabel, href: config.accountHref },
  ];

  return (
    <section
      id="navigation"
      className="bg-background text-foreground border-b border-border sticky top-0 z-50"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavigation(config.homeHref)}
              className="flex flex-col items-start group"
              data-editable-href="homeHref"
              data-href={config.homeHref}
            >
              <span
                className="text-xl lg:text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors"
                data-editable="brandName"
              >
                {config.brandName}
              </span>
              <span
                className="text-xs text-muted-foreground hidden sm:block"
                data-editable="brandTagline"
              >
                {config.brandTagline}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(item.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-editable-href={idx === 0 ? 'homeHref' : 'shopHref'}
                data-href={item.href}
              >
                <span data-editable={idx === 0 ? 'homeLabel' : 'shopLabel'}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {actionItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(item.href)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={item.label}
                data-editable-href={
                  idx === 0 ? 'wishlistHref' : idx === 1 ? 'cartHref' : 'accountHref'
                }
                data-href={item.href}
              >
                <item.icon className="h-5 w-5" />
              </button>
            ))}
            <Button
              onClick={() => handleNavigation(config.ctaHref)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 ml-4"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {actionItems.slice(1, 2).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(item.href)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={item.label}
                data-editable-href="cartHref"
                data-href={item.href}
              >
                <item.icon className="h-5 w-5" />
              </button>
            ))}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card text-card-foreground">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-lg font-bold text-primary" data-editable="brandName">
                      {config.brandName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={config.closeMenuLabel}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-4 mb-8">
                  {navigationItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavigation(item.href)}
                      className="block w-full text-left py-3 px-4 text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                      data-editable-href={idx === 0 ? 'homeHref' : 'shopHref'}
                      data-href={item.href}
                    >
                      <span data-editable={idx === 0 ? 'homeLabel' : 'shopLabel'}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile Action Items */}
                <div className="space-y-3 mb-8">
                  {actionItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavigation(item.href)}
                      className="flex items-center w-full py-3 px-4 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                      data-editable-href={
                        idx === 0 ? 'wishlistHref' : idx === 1 ? 'cartHref' : 'accountHref'
                      }
                      data-href={item.href}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span
                        data-editable={
                          idx === 0 ? 'wishlistLabel' : idx === 1 ? 'cartLabel' : 'accountLabel'
                        }
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile CTA */}
                <Button
                  onClick={() => handleNavigation(config.ctaHref)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
