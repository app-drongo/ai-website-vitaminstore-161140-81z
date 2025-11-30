'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRODUCT_GRID = {
  title: 'Premium Health Supplements',
  subtitle: 'Discover our carefully curated selection of vitamins and supplements',
  viewAllText: 'View All Products',
  viewAllHref: '/shop',
  addToCartText: 'Add to Cart',
  products: [
    {
      id: '1',
      name: 'Complete Multivitamin',
      description: 'Essential daily nutrients for optimal health',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviewCount: 324,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      imageAlt: 'Complete Multivitamin bottle',
      badge: 'Best Seller',
      category: 'Multivitamins',
    },
    {
      id: '2',
      name: 'Vitamin D3 5000 IU',
      description: 'High-potency vitamin D for immune support',
      price: 19.99,
      originalPrice: null,
      rating: 4.9,
      reviewCount: 156,
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      imageAlt: 'Vitamin D3 supplement bottle',
      badge: 'New',
      category: 'Vitamin D',
    },
    {
      id: '3',
      name: 'Vitamin C 1000mg',
      description: 'Immune system support with antioxidant protection',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.7,
      reviewCount: 89,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=400&h=400&fit=crop',
      imageAlt: 'Vitamin C supplement bottle',
      badge: 'Sale',
      category: 'Vitamin C',
    },
  ],
} as const;

type ProductGridProps = Partial<typeof DEFAULT_PRODUCT_GRID>;

export default function Productgrid(props: ProductGridProps) {
  const config = { ...DEFAULT_PRODUCT_GRID, ...props };
  const navigate = useSmartNavigation();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', productId);
  };

  const handleViewAll = () => {
    navigate(config.viewAllHref);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section id="product-grid" className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <Button
            onClick={handleViewAll}
            variant="outline"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            data-editable-href="viewAllHref"
            data-href={config.viewAllHref}
          >
            <span data-editable="viewAllText">{config.viewAllText}</span>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.products.map((product, idx) => (
            <Card
              key={product.id}
              className="group bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-editable-src={`products[${idx}].imageUrl`}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.badge === 'Sale'
                          ? 'bg-destructive text-destructive-foreground'
                          : product.badge === 'New'
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <span data-editable={`products[${idx}].badge`}>{product.badge}</span>
                    </Badge>
                  )}

                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`absolute top-3 right-3 w-8 h-8 p-0 bg-background/80 hover:bg-background transition-all duration-200 ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      <span data-editable={`products[${idx}].category`}>{product.category}</span>
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">
                    <span data-editable={`products[${idx}].name`}>{product.name}</span>
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    <span data-editable={`products[${idx}].description`}>
                      {product.description}
                    </span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-muted-foreground">
                      <span data-editable={`products[${idx}].rating`}>{product.rating}</span> (
                      <span data-editable={`products[${idx}].reviewCount`}>
                        {product.reviewCount}
                      </span>
                      )
                    </span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        $<span data-editable={`products[${idx}].price`}>{product.price}</span>
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          $
                          <span data-editable={`products[${idx}].originalPrice`}>
                            {product.originalPrice}
                          </span>
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      <span data-editable="addToCartText">{config.addToCartText}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
