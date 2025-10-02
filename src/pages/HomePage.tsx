import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users } from 'lucide-react';
import { InteractiveStats } from '@/components/InteractiveStats';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Footer } from '@/components/Footer';
import anilHeroImage from '@/assets/anil-hero.jpg';
import amaiHeroImage from '@/assets/amai-hero.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Split Screen Section */}
      <section className="relative h-screen flex flex-col md:flex-row">
        {/* Anil Side */}
        <Link 
          to="/anil" 
          className="group flex-1 split-anil flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15)), url(${anilHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center z-10 relative">
            <div className="heading-hero text-white mb-6 animate-fade-in drop-shadow-2xl">
              Anil
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light drop-shadow-lg modern-text">
              For the Ultimate Thala Fans
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80 group-hover:text-white transition-colors">
              <span className="font-medium modern-text">Explore Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 group-hover:from-blue-900/30 group-hover:to-purple-900/30 transition-all duration-500" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-anil-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </Link>

        {/* Divider */}
        <div className="w-px md:w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent z-10 relative" />

        {/* Amai Side */}
        <Link 
          to="/amai" 
          className="group flex-1 split-amai flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15)), url(${amaiHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center z-10 relative">
            <div className="heading-hero text-white mb-6 animate-fade-in drop-shadow-2xl">
              Amai
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light drop-shadow-lg modern-text">
              For the Devoted Thalapathy Fans
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80 group-hover:text-white transition-colors">
              <span className="font-medium modern-text">Explore Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-orange-900/40 group-hover:from-red-900/30 group-hover:to-orange-900/30 transition-all duration-500" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-amai-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-4">Premium Fandom Merchandise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto modern-text">
              Celebrate your favorite stars with our exclusive, high-quality collection designed for true fans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="product-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-anil-primary/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-anil-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 modern-text">Premium Quality</h3>
              <p className="text-muted-foreground modern-text">
                High-quality materials and printing that lasts as long as your fandom.
              </p>
            </div>

            <div className="product-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amai-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-amai-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 modern-text">Authentic Designs</h3>
              <p className="text-muted-foreground modern-text">
                Original designs inspired by iconic moments and dialogues.
              </p>
            </div>

            <div className="product-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 modern-text">Fast Delivery</h3>
              <p className="text-muted-foreground modern-text">
                Quick shipping so you can show your support without delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats */}
      <InteractiveStats />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;