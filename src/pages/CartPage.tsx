import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Package, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-muted/30 to-muted/10 rounded-full flex items-center justify-center animate-float">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/70" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-white text-sm font-bold">
              0
            </div>
          </div>
          <h1 className="heading-section mb-6">Your cart is empty</h1>
          <p className="text-xl text-muted-foreground mb-12 modern-text leading-relaxed">
            Discover amazing products from our exclusive Anil and Amai collections. 
            Start shopping to fill your cart with premium fan merchandise!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/anil">
              <Button className="btn-anil w-full h-14 text-lg">
                <Package className="h-5 w-5 mr-3" />
                Shop Anil Collection
              </Button>
            </Link>
            <Link to="/amai">
              <Button className="btn-amai w-full h-14 text-lg">
                <Package className="h-5 w-5 mr-3" />
                Shop Amai Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-muted/80">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="heading-section">Shopping Cart</h1>
              <p className="text-lg text-muted-foreground modern-text mt-2">
                {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} ready for checkout
              </p>
            </div>
          </div>
          
          {state.items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="h-12 px-6 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item, index) => (
              <Card key={item.id} className="product-card card-hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-2xl bg-muted shadow-lg"
                      />
                      <div className={`absolute -top-2 -right-2 w-6 h-6 ${item.brand === 'anil' ? 'bg-anil-primary' : 'bg-amai-primary'} rounded-full flex items-center justify-center`}>
                        <span className="text-xs text-white font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl truncate modern-text mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.brand === 'anil' 
                            ? 'bg-anil-primary/10 text-anil-primary' 
                            : 'bg-amai-primary/10 text-amai-primary'
                        }`}>
                          {item.brand.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-muted/50 rounded-xl p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-lg hover:bg-background"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-12 text-center font-bold text-lg">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-lg hover:bg-background"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right min-w-0">
                      <p className="font-black text-2xl mb-3">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="product-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 modern-text">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({state.itemCount} items)</span>
                      <span className="font-medium">₹{state.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (GST 18%)</span>
                      <span className="font-medium">₹{Math.round(state.total * 0.18).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{Math.round(state.total * 1.18).toLocaleString()}</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-sm font-semibold text-muted-foreground">Select Payment Method</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start h-12 hover:border-primary">
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        UPI Payment
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 hover:border-primary">
                        <CreditCard className="h-5 w-5 mr-3" />
                        Card Payment
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 hover:border-primary">
                        <Package className="h-5 w-5 mr-3" />
                        Cash on Delivery
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full btn-anil h-12 text-base btn-pulse">
                      Proceed to Payment
                    </Button>
                    
                    <div className="text-center">
                      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors modern-text">
                        <ArrowLeft className="h-4 w-4 inline mr-2" />
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="product-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                        <Truck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Free Shipping</p>
                        <p className="text-sm text-muted-foreground">On orders above ₹500</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Easy Returns</p>
                        <p className="text-sm text-muted-foreground">30-day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Secure Payment</p>
                        <p className="text-sm text-muted-foreground">100% secure checkout</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;