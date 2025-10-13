import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Send, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SubscriptionForm } from '@/components/SubscriptionForm';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

// Social media icons (using simple SVGs for better customization)
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const RedditIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

export const Footer = () => {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  return (
    <footer className="bg-background border-t border-border/40">
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-anil-primary/5 via-purple-500/5 to-amai-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="heading-section mb-6">Stay Connected</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto modern-text">
            Get the latest updates on new collections, exclusive drops, and fan community events
          </p>
          <Dialog open={isSubscriptionOpen} onOpenChange={setIsSubscriptionOpen}>
            <DialogTrigger asChild>
              <Button className="btn-anil h-12 px-8">
                <Send className="h-4 w-4 mr-2" />
                Subscribe to Newsletter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <SubscriptionForm onClose={() => setIsSubscriptionOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="brand-logo-enhanced text-3xl">
              AnilAmai
            </div>
            <p className="text-muted-foreground modern-text leading-relaxed">
              Premium Tamil cinema fandom merchandise for Thala and Thalapathy fans. 
              Celebrate your passion with authentic, high-quality products.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-anil-primary" />
                <span className="text-sm font-medium">50K+ Fans</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">4.9 Rating</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold modern-text">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/anil" className="block text-muted-foreground hover:text-anil-primary transition-colors modern-text">
                Anil Collection
              </Link>
              <Link to="/amai" className="block text-muted-foreground hover:text-amai-primary transition-colors modern-text">
                Amai Collection
              </Link>
              <Link to="/anil/apparels" className="block text-muted-foreground hover:text-foreground transition-colors modern-text">
                Apparels
              </Link>
              <Link to="/amai/accessories" className="block text-muted-foreground hover:text-foreground transition-colors modern-text">
                Accessories
              </Link>
              <Link to="/cart" className="block text-muted-foreground hover:text-foreground transition-colors modern-text">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold modern-text">Join Our Community</h4>
            <div className="space-y-4">
              <a 
                href="https://twitter.com/anilamai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-muted-foreground hover:text-blue-400 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-blue-400/10 transition-colors">
                  <XIcon />
                </div>
                <div>
                  <div className="font-medium modern-text">X (Twitter)</div>
                  <div className="text-sm text-muted-foreground">Follow for updates</div>
                </div>
              </a>
              
              <a 
                href="https://instagram.com/anilamai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-muted-foreground hover:text-pink-500 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-pink-500/10 transition-colors">
                  <InstagramIcon />
                </div>
                <div>
                  <div className="font-medium modern-text">Instagram</div>
                  <div className="text-sm text-muted-foreground">Behind the scenes</div>
                </div>
              </a>

              <a 
                href="https://reddit.com/r/anilamai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-muted-foreground hover:text-orange-500 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-orange-500/10 transition-colors">
                  <RedditIcon />
                </div>
                <div>
                  <div className="font-medium modern-text">Reddit</div>
                  <div className="text-sm text-muted-foreground">Fan discussions</div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold modern-text">Get In Touch</h4>
            <div className="space-y-4">
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-muted-foreground hover:text-green-500 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-green-500/10 transition-colors">
                  <WhatsAppIcon />
                </div>
                <div>
                  <div className="font-medium modern-text">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">Quick support</div>
                </div>
              </a>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-muted/50">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium modern-text">Email</div>
                  <div className="text-sm text-muted-foreground">hello@anilamai.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium modern-text">Location</div>
                  <div className="text-sm text-muted-foreground">Chennai, Tamil Nadu</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground modern-text">
              © 2024 AnilAmai. Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> for Tamil Cinema Fans
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors modern-text">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors modern-text">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors modern-text">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};