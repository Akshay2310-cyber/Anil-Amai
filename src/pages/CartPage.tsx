import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 modern-text">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 modern-text">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <div className="space-y-4">
            <Link to="/anil">
              <Button className="btn-anil w-full">
                Shop Anil Collection
              </Button>
            </Link>
            <Link to="/amai">
              <Button className="btn-amai w-full">
                Shop Amai Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold modern-text">Shopping Cart</h1>
              <p className="text-muted-foreground modern-text">
                {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
          
          {state.items.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="product-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-muted"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate modern-text">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize modern-text">
                        {item.brand} • {item.category}
                      </p>
                      <p className="text-lg font-bold mt-1">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right min-w-0">
                      <p className="font-bold text-lg">
                        ₹{item.price * item.quantity}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive mt-2"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="product-card sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 modern-text">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{Math.round(state.total * 0.18)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(state.total * 1.18)}</span>
                  </div>
                </div>

                <Button className="w-full btn-anil mb-4 h-12 text-lg">
                  Proceed to Checkout
                </Button>
                
                <div className="text-center">
                  <Link to="/" className="text-sm text-muted-foreground hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;