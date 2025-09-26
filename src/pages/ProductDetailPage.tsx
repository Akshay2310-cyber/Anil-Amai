import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Star, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart, type Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import sampleProductImage from '@/assets/sample-product.jpg';

interface ProductDetailPageProps {
  brand: 'anil' | 'amai';
}

const ProductDetailPage = ({ brand }: ProductDetailPageProps) => {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const brandConfig = {
    anil: {
      name: 'Anil',
      color: 'anil-primary',
      gradient: 'from-anil-primary/10 to-purple-500/10',
      btnClass: 'btn-anil'
    },
    amai: {
      name: 'Amai',
      color: 'amai-primary', 
      gradient: 'from-amai-primary/10 to-orange-500/10',
      btnClass: 'btn-amai'
    }
  };

  // Mock product data with multiple images
  const productImages = [
    sampleProductImage,
    sampleProductImage, // In real app, these would be different images
    sampleProductImage,
    sampleProductImage
  ];

  const product: Product = {
    id: productId || `${brand}-${category}-1`,
    name: brand === 'anil' ? 'Thala Premium T-Shirt' : 'Thalapathy Classic Tee',
    price: 899,
    image: sampleProductImage,
    brand,
    category: category || 'apparels',
    description: `Premium quality ${category} designed exclusively for ${brandConfig[brand].name} fans. Made with 100% premium cotton for ultimate comfort and durability.`
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    toast({
      title: 'Added to cart!',
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const features = [
    { icon: Truck, text: 'Free Shipping' },
    { icon: Shield, text: '1 Year Warranty' },
    { icon: RotateCcw, text: '30 Days Return' }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="capitalize">{brandConfig[brand].name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="capitalize">{category}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted/30 card-hover-lift">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === index 
                      ? `ring-2 ring-${brandConfig[brand].color} scale-105` 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
                {brandConfig[brand].name} Collection
              </Badge>
              
              <h1 className="heading-section mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(4.9) • 127 reviews</span>
                </div>
              </div>

              <div className="text-4xl font-bold mb-6">₹{product.price}</div>
              
              <p className="text-lg text-muted-foreground leading-relaxed modern-text">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 modern-text">Select Size</h3>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-xl font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? `bg-${brandConfig[brand].color} text-white scale-105`
                        : 'bg-muted hover:bg-muted/80 text-foreground hover:scale-105'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-4 modern-text">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center font-medium"
                >
                  -
                </button>
                <span className="w-16 text-center font-semibold text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className={`w-full h-14 text-lg ${brandConfig[brand].btnClass} btn-pulse`}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                Add to Cart • ₹{product.price * quantity}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="product-card">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-${brandConfig[brand].color}/10 flex items-center justify-center`}>
                        <feature.icon className={`h-5 w-5 text-${brandConfig[brand].color}`} />
                      </div>
                      <span className="font-medium modern-text">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;