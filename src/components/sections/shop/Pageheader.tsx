'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ShoppingCart, Filter, Grid3X3, List, Search } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_PAGE_HEADER = {
  title: 'Premium Vitamins & Supplements',
  subtitle:
    'Discover our complete collection of high-quality vitamins and supplements for optimal health',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
  ],
  totalProducts: 247,
  categories: [
    { name: 'Multivitamins', count: 45 },
    { name: 'Vitamin D', count: 32 },
    { name: 'Vitamin C', count: 28 },
  ],
  searchPlaceholder: 'Search vitamins and supplements...',
  viewMode: 'grid' as 'grid' | 'list',
  showFilters: true,
} as const;

type PageHeaderProps = Partial<typeof DEFAULT_PAGE_HEADER>;

export default function Pageheader(props: PageHeaderProps) {
  const config = { ...DEFAULT_PAGE_HEADER, ...props };
  const navigate = useSmartNavigation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(config.viewMode);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (href: string) => {
    navigate(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section id="page-header" className="bg-background text-foreground border-b border-border">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {config.breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center">
                {idx === config.breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>
                    <span data-editable={`breadcrumbs[${idx}].label`}>{crumb.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        onClick={() => navigate(crumb.href)}
                        className="cursor-pointer hover:text-primary"
                        data-editable-href={`breadcrumbs[${idx}].href`}
                        data-href={crumb.href}
                      >
                        <span data-editable={`breadcrumbs[${idx}].label`}>{crumb.label}</span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Header Content */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              <span data-editable="title">{config.title}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-md mx-auto mb-8"
              data-form-id="692c2a6febaf3f40193769e6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={config.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  data-editable="searchPlaceholder"
                />
              </div>
            </form>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {config.categories.map((category, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() =>
                    handleCategoryClick(`/shop?category=${category.name.toLowerCase()}`)
                  }
                  data-editable-href={`categories[${idx}].href`}
                  data-href={`/shop?category=${category.name.toLowerCase()}`}
                >
                  <span data-editable={`categories[${idx}].name`}>{category.name}</span>
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Product Count */}
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{config.totalProducts}</span>{' '}
              products
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Button */}
              {config.showFilters && (
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              )}

              {/* View Mode Toggle */}
              <div className="flex items-center border border-border rounded-lg p-1 bg-background">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
