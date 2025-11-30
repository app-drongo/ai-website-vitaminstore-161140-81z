'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRODUCT_SHOWCASE = {
  title: 'Featured Health Products',
  subtitle: 'Premium vitamins and supplements for your healthiest life',
  ctaText: 'Shop All Products',
  ctaHref: '/shop',
  products: [
    {
      id: '1',
      name: 'Complete Multivitamin',
      description: 'Essential daily nutrients for optimal health and energy',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 1247,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      imageAlt: 'Complete Multivitamin bottle',
      badge: 'Best Seller',
      benefits: ['Energy Support', 'Immune Boost', 'Daily Wellness'],
    },
    {
      id: '2',
      name: 'Vitamin D3 5000 IU',
      description: 'High-potency vitamin D for bone health and immune support',
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.9,
      reviews: 892,
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      imageAlt: 'Vitamin D3 supplement bottle',
      badge: 'Doctor Recommended',
      benefits: ['Bone Health', 'Immune Support', 'Mood Balance'],
    },
    {
      id: '3',
      name: 'Vitamin C 1000mg',
      description: 'Powerful antioxidant support for immune system health',
      price: 16.99,
      originalPrice: 21.99,
      rating: 4.7,
      reviews: 634,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=400&h=400&fit=crop',
      imageAlt: 'Vitamin C supplement bottle',
      badge: 'New Formula',
      benefits: ['Antioxidant Power', 'Immune Defense', 'Skin Health'],
    },
  ],
} as const;

type ProductShowcaseProps = Partial<typeof DEFAULT_PRODUCT_SHOWCASE>;

export default function Productshowcase(props: ProductShowcaseProps) {
  const config = { ...DEFAULT_PRODUCT_SHOWCASE, ...props };
  const navigate = useSmartNavigation();
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    // Cart functionality would be implemented here
    console.log('Added to cart:', productId);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <section id="product-showcase" className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {config.products.map((product, idx) => (
            <Card
              key={product.id}
              className="bg-card text-card-foreground hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-editable-src={`products[${idx}].imageUrl`}
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    <span data-editable={`products[${idx}].badge`}>{product.badge}</span>
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                    />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <span data-editable={`products[${idx}].name`}>{product.name}</span>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    <span data-editable={`products[${idx}].description`}>
                      {product.description}
                    </span>
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.benefits.map((benefit, benefitIdx) => (
                      <Badge key={benefitIdx} variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span data-editable={`products[${idx}].benefits[${benefitIdx}]`}>
                          {benefit}
                        </span>
                      </Badge>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      <span data-editable={`products[${idx}].rating`}>{product.rating}</span>(
                      {<span data-editable={`products[${idx}].reviews`}>{product.reviews}</span>}{' '}
                      reviews)
                    </span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        $<span data-editable={`products[${idx}].price`}>{product.price}</span>
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        $
                        <span data-editable={`products[${idx}].originalPrice`}>
                          {product.originalPrice}
                        </span>
                      </span>
                    </div>
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate(config.ctaHref)}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
