import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Package, CreditCard, Truck, Tag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const coupons = {
    FIRST: {
      discount: 0.2,
      minAmount: 499,
      description: '20% off on orders above ₹499'
    }
  };

  const applyCoupon = () => {
    const upperCouponCode = couponCode.toUpperCase();
    const coupon = coupons[upperCouponCode as keyof typeof coupons];
    
    if (!coupon) {
      toast({
        title: 'Invalid coupon',
        description: 'The coupon code you entered is not valid.',
        variant: 'destructive'
      });
      return;
    }

    if (state.total < coupon.minAmount) {
      toast({
        title: 'Minimum amount not met',
        description: `Add items worth ₹${coupon.minAmount - state.total} more to use this coupon.`,
        variant: 'destructive'
      });
      return;
    }

    const discount = Math.round(state.total * coupon.discount);
    setCouponDiscount(discount);
    setAppliedCoupon(upperCouponCode);
    toast({
      title: 'Coupon applied!',
      description: `You saved ₹${discount} with code ${upperCouponCode}`,
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode('');
    toast({
      title: 'Coupon removed',
      description: 'The coupon has been removed from your order.',
    });
  };

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative mb-6 md:mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-muted/30 to-muted/10 rounded-full flex items-center justify-center animate-float">
              <ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground/70" />
            </div>
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-destructive rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold">
              0
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Your cart is empty</h1>
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 modern-text leading-relaxed">
            Discover amazing products from our exclusive Anil and Amai collections. 
            Start shopping to fill your cart with premium fan merchandise!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <Link to="/anil" className="w-full">
              <Button className="btn-anil w-full h-12 md:h-14 text-base md:text-lg">
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
                Shop Anil Collection
              </Button>
            </Link>
            <Link to="/amai" className="w-full">
              <Button className="btn-amai w-full h-12 md:h-14 text-base md:text-lg">
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
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
      <div className="container mx-auto px-4 max-w-7xl py-4 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl hover:bg-muted/80">
                <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Shopping Cart</h1>
              <p className="text-sm md:text-lg text-muted-foreground modern-text mt-1">
                {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} ready for checkout
              </p>
            </div>
          </div>
          
          {state.items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="h-10 md:h-12 px-4 md:px-6 text-destructive border-destructive/30 hover:bg-destructive/10 text-sm md:text-base"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Clear Cart</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {state.items.map((item, index) => (
              <Card key={item.id} className="product-card card-hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl md:rounded-2xl bg-muted shadow-lg"
                      />
                      <div className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 ${item.brand === 'anil' ? 'bg-anil-primary' : 'bg-amai-primary'} rounded-full flex items-center justify-center`}>
                        <span className="text-xs text-white font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base md:text-xl mb-2 modern-text line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.brand === 'anil' 
                            ? 'bg-anil-primary/10 text-anil-primary' 
                            : 'bg-amai-primary/10 text-amai-primary'
                        }`}>
                          {item.brand.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl font-bold text-foreground mb-3">
                        ₹{item.price.toLocaleString()}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:h-10 md:w-10 rounded-lg hover:bg-background"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                          
                          <span className="w-8 md:w-12 text-center font-bold text-sm md:text-lg">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:h-10 md:w-10 rounded-lg hover:bg-background"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="font-black text-lg md:text-2xl">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:h-10 md:w-10 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg md:rounded-xl"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
              <Card className="product-card">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 modern-text">Order Summary</h2>
                  
                  {/* Coupon Section */}
                  <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Have a coupon?</span>
                    </div>
                    
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-600">{appliedCoupon}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={removeCoupon}
                          className="h-7 text-xs hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="h-10 text-sm"
                        />
                        <Button 
                          onClick={applyCoupon}
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap h-10 px-4"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    {!appliedCoupon && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Try code "FIRST" for 20% off on orders above ₹499
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({state.itemCount} items)</span>
                      <span className="font-medium">₹{state.total.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && couponDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Coupon Discount</span>
                        <span className="font-medium text-green-600">-₹{couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (GST 18%)</span>
                      <span className="font-medium">₹{Math.round((state.total - couponDiscount) * 0.18).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg md:text-xl font-bold mb-4 md:mb-6">
                    <span>Total</span>
                    <span>₹{Math.round((state.total - couponDiscount) * 1.18).toLocaleString()}</span>
                  </div>

                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold text-muted-foreground">Select Payment Method</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start h-10 md:h-12 text-sm md:text-base hover:border-primary">
                        <svg className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        UPI Payment
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-10 md:h-12 text-sm md:text-base hover:border-primary">
                        <CreditCard className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
                        Card Payment
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-10 md:h-12 text-sm md:text-base hover:border-primary">
                        <Package className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
                        Cash on Delivery
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <Button className="w-full btn-anil h-11 md:h-12 text-sm md:text-base btn-pulse">
                      Proceed to Payment
                    </Button>
                    
                    <div className="text-center">
                      <Link to="/" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors modern-text">
                        <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="product-card hidden lg:block">
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 dark:bg-green-900/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <Truck className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">Free Shipping</p>
                        <p className="text-xs md:text-sm text-muted-foreground">On orders above ₹500</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">Easy Returns</p>
                        <p className="text-xs md:text-sm text-muted-foreground">30-day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">Secure Payment</p>
                        <p className="text-xs md:text-sm text-muted-foreground">100% secure checkout</p>
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