import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, type Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import tshirtImage from '@/assets/tshirt.png';

interface CategoryPageProps {
  brand: 'anil' | 'amai';
}

const CategoryPage = ({ brand }: CategoryPageProps) => {
  const { category } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();

  const brandConfig = {
    anil: {
      name: 'Anil',
      color: 'anil-primary',
      gradient: 'from-anil-primary/10 to-purple-500/10'
    },
    amai: {
      name: 'Amai',
      color: 'amai-primary',
      gradient: 'from-amai-primary/10 to-orange-500/10'
    }
  };

  const categoryNames = {
    apparels: 'Apparels',
    accessories: 'Accessories',
    memes: 'Meme Collection'
  };

  // Mock product data
  const products: Product[] = [
    {
      id: `${brand}-${category}-1`,
      name: brand === 'anil' ? 'Thala Premium Tee' : 'Thalapathy Classic Tee',
      price: 899,
      image: tshirtImage,
      brand,
      category: category || 'apparels',
      description: 'Minimalist aesthetic design for true fans'
    },
    {
      id: `${brand}-${category}-2`,
      name: brand === 'anil' ? 'Thala Signature Tee' : 'Thalapathy Premium Tee',
      price: 1099,
      image: tshirtImage,
      brand,
      category: category || 'apparels',
      description: 'Simple & elegant premium cotton'
    },
    {
      id: `${brand}-${category}-3`,
      name: brand === 'anil' ? 'Thala Classic Tee' : 'Thalapathy Essential Tee',
      price: 799,
      image: tshirtImage,
      brand,
      category: category || 'apparels',
      description: 'Timeless design for everyday wear'
    },
    {
      id: `${brand}-${category}-4`,
      name: brand === 'anil' ? 'Thala Limited Edition' : 'Thalapathy Special Edition',
      price: 1299,
      image: tshirtImage,
      brand,
      category: category || 'apparels',
      description: 'Exclusive limited collection piece'
    },
    {
      id: `${brand}-${category}-5`,
      name: brand === 'anil' ? 'Thala Comfort Tee' : 'Thalapathy Comfort Tee',
      price: 899,
      image: tshirtImage,
      brand,
      category: category || 'apparels',
      description: 'Soft premium fabric for all-day comfort'
    },
    {
      id: `${brand}-${category}-6`,
      name: brand === 'anil' ? 'Thala Essential Tee' : 'Thalapathy Core Tee',
      price: 749,
      image: tshirtImage,
      brand,
      category: category || 'apparels',
      description: 'Clean aesthetic for loyal supporters'
    }
  ];

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`py-16 bg-gradient-to-br ${brandConfig[brand].gradient}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
              {brandConfig[brand].name} Collection
            </Badge>
            <h1 className="heading-section mb-4">
              {categoryNames[category as keyof typeof categoryNames]}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto modern-text">
              Discover our exclusive {categoryNames[category as keyof typeof categoryNames].toLowerCase()} 
              collection designed for {brandConfig[brand].name} fans
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="product-card group animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/4] bg-muted/30 rounded-xl mb-4 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/${brand}/${category}/${product.id}`}
                      className="bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-xl font-medium hover:bg-white transition-colors flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Quick View</span>
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg leading-tight modern-text">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground modern-text">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground ml-1">
                        (4.9)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold">
                      ₹{product.price}
                    </span>
                    <div className="flex space-x-2">
                      <Link to={`/${brand}/${category}/${product.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className={brand === 'anil' ? 'btn-anil' : 'btn-amai'}
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;