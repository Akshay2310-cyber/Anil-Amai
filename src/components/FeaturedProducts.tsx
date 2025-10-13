import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Flame, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, type Product } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import tshirtImage from '@/assets/tshirt.png';

export const FeaturedProducts = () => {
  const { dispatch } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const featuredProducts: Product[] = [
    {
      id: 'featured-1',
      name: 'Thala 7 Premium Tee',
      price: 1299,
      image: tshirtImage,
      brand: 'anil',
      category: 'apparels',
      description: 'Minimalist design for true fans'
    },
    {
      id: 'featured-2',
      name: 'Thalapathy Classic Tee',
      price: 1199,
      image: tshirtImage,
      brand: 'amai',
      category: 'apparels',
      description: 'Simple & elegant fan favorite'
    },
    {
      id: 'featured-3',
      name: 'Thala Signature Tee',
      price: 1399,
      image: tshirtImage,
      brand: 'anil',
      category: 'apparels',
      description: 'Premium quality cotton tee'
    }
  ];

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = async (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to add items to your wishlist.',
        variant: 'destructive',
      });
      return;
    }

    if (isInWishlist(product.id)) {
      const success = await removeFromWishlist(product.id);
      if (success) {
        toast({
          title: 'Removed from wishlist',
          description: `${product.name} has been removed from your wishlist.`,
        });
      }
    } else {
      const success = await addToWishlist(product);
      if (success) {
        toast({
          title: 'Added to wishlist',
          description: `${product.name} has been added to your wishlist.`,
        });
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flame className="h-8 w-8 text-orange-500" />
            <h2 className="heading-section">Trending Now</h2>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto modern-text">
            Our most popular items that fans can't get enough of
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="product-card group relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 font-bold">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>

              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl mb-6 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold leading-tight group-hover:text-anil-primary transition-colors modern-text">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground modern-text">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black text-green-600">
                      ₹{product.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{Math.round(product.price * 1.3)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleWishlistToggle(product)}
                      className={`h-9 w-9 ${
                        isInWishlist(product.id) 
                          ? 'text-red-500 border-red-500 hover:bg-red-50' 
                          : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className={product.brand === 'anil' ? 'btn-anil' : 'btn-amai'}
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/anil">
              <Button className="btn-anil text-lg px-8 py-4 w-full sm:w-auto">
                Explore Anil Collection
              </Button>
            </Link>
            <Link to="/amai">
              <Button className="btn-amai text-lg px-8 py-4 w-full sm:w-auto">
                Explore Amai Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};