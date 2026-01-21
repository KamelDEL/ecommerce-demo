"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Plus, ArrowLeft, ChevronRight, Truck, Shield, RefreshCcw, Home, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  tag: string | null;
  description: string;
  specs: string[];
};

type CartItem = Product & {
    cartId: string;
};

export default function EcommerceDemo() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('ecommerce_cart_items');
    if (saved) {
      try {
          setCartItems(JSON.parse(saved));
      } catch (e) {
          console.error('Failed to parse cart items', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('ecommerce_cart_items', JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const addToCart = (product: Product) => {
      const newItem = { ...product, cartId: Date.now().toString() };
      setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId: string) => {
      setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const products: Product[] = [
    {
      id: 1,
      name: "Cyber Punk Headset",
      price: 199.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      tag: "Best Seller",
      description: "Immerse yourself in the digital realm with our premium Cyber Punk Headset. Featuring active noise cancellation, 7.1 surround sound, and RGB lighting that syncs with your gameplay.",
      specs: ["7.1 Surround Sound", "Active Noise Cancellation", "20hr Battery Life", "RGB Chroma Lighting"]
    },
    {
      id: 2,
      name: "Neon Keyboard",
      price: 129.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
      tag: "New",
      description: "Type at the speed of light. Our mechanical Neon Keyboard offers tactile feedback with ultra-low latency switches, perfect for competitive gaming and coding marathons.",
      specs: ["Mechanical Blue Switches", "Per-key RGB", "Aircraft-grade Aluminum", "USB-C Detachable"]
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 79.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      tag: "Sale",
      description: "Precision meets ergonimics. This ultra-lightweight gaming mouse features a 20K DPI sensor and programmable buttons to give you the edge in any battle.",
      specs: ["20K DPI Sensor", "6 Programmable Buttons", "60g Ultralight", "PTFE Feet"]
    },
    {
      id: 4,
      name: "Ultra Wide Monitor",
      price: 499.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d4dd6?w=800&q=80",
      tag: null,
      description: "Expand your horizon. This 34-inch curved ultra-wide monitor delivers breathtaking visuals with a 144Hz refresh rate and 1ms response time.",
      specs: ["34\" Curved Display", "144Hz Refresh Rate", "1ms Response Time", "HDR 400"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/">
                    <Home className="w-5 h-5" />
                </Link>
            </Button>
            <ThemeToggle />
            {selectedProduct && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedProduct(null)}
                className="hover:bg-primary/20"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            )}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-primary bg-clip-text text-transparent mb-2">
                TechStore
              </h1>
              <p className="text-muted-foreground hidden sm:block">Premium Cyberpunk Gear</p>
            </div>
          </div>
          <div className="relative">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-primary/50 relative overflow-visible hover:bg-primary/10">
                    <ShoppingCart className="w-6 h-6" />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                        {cartItems.length}
                        </span>
                    )}
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-200px)] mt-4 pr-4">
                        <div className="space-y-4">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.cartId} className="flex gap-4 items-center bg-muted/40 p-3 rounded-lg">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                                            <p className="text-primary font-bold">${item.price}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.cartId)} className="text-destructive hover:bg-destructive/10">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
                                Checkout
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className="group overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.tag && (
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                        {product.tag}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button 
                         variant="secondary"
                         onClick={(e) => {
                             e.stopPropagation();
                             addToCart(product);
                         }}
                      >
                         Quick Add
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg truncate pr-2">{product.name}</h3>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        {product.rating}
                      </div>
                    </div>
                    <p className="text-xl font-bold text-primary">${product.price}</p>
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 bg-muted">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className="aspect-square rounded-lg bg-muted overflow-hidden border border-border cursor-pointer hover:border-primary transition-colors">
                        <img src={selectedProduct.image} alt="Thumbnail" className="w-full h-full object-cover" />
                     </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  {selectedProduct.tag && (
                    <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 text-sm px-3 py-1">
                      {selectedProduct.tag}
                    </Badge>
                  )}
                  <h2 className="text-4xl font-bold mb-4">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-muted'}`} />
                      ))}
                    </div>
                    <span className="text-muted-foreground text-sm">({selectedProduct.rating} / 5.0 Rating)</span>
                  </div>
                  <p className="text-3xl font-bold text-primary mb-6">${selectedProduct.price}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="flex-1 text-lg h-14"
                    onClick={() => addToCart(selectedProduct)}
                  >
                    Add to Cart <ShoppingCart className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 w-14 p-0">
                    <Star className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 text-center">
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-6 h-6 text-primary" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-6 h-6 text-primary" />
                    <span>2 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCcw className="w-6 h-6 text-primary" />
                    <span>30 Day Returns</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
