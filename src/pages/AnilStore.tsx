import { Link } from 'react-router-dom';
import { Shirt, Gamepad2, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

const AnilStore = () => {
  const categories = [
    {
      id: 'apparels',
      name: 'Apparels',
      description: 'T-shirts, hoodies, and more for the ultimate Thala fans',
      icon: Shirt,
      image: '/api/placeholder/400/300',
      count: '25+ items'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Phone covers, mugs, and exclusive collectibles',
      icon: Gamepad2,
      image: '/api/placeholder/400/300',
      count: '15+ items'
    },
    {
      id: 'memes',
      name: 'Meme Collection',
      description: 'Iconic dialogues and memes that define Thala',
      icon: MessageCircle,
      image: '/api/placeholder/400/300',
      count: '30+ items'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-anil-primary/10 via-background to-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-hero text-anil-primary mb-6 animate-fade-in">
              Anil Store
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in modern-text" style={{ animationDelay: '0.2s' }}>
              Premium merchandise for the ultimate Thala fans. Show your devotion with style.
            </p>
            <div className="inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button className="btn-anil text-lg px-8 py-4">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-anil-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground modern-text">
              Discover our exclusive Anil collection across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/anil/${category.id}`}
                className="group product-card block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-anil-primary/5 to-purple-500/5 rounded-xl mb-6 flex items-center justify-center group-hover:from-anil-primary/10 group-hover:to-purple-500/10 transition-all duration-500">
                  <category.icon className="h-16 w-16 text-anil-primary" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold group-hover:text-anil-primary transition-colors">
                      {category.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-anil-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed modern-text">
                    {category.description}
                  </p>
                  
                  <div className="text-sm font-medium text-anil-primary">
                    {category.count}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-24 bg-gradient-to-r from-anil-primary/5 to-purple-500/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-section mb-6">
            Thala for a Reason 💙
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto modern-text">
            Join thousands of fans worldwide who proudly wear their love for Thala. 
            Every purchase supports the community that celebrates the ultimate legend.
          </p>
          <Button className="btn-anil">
            Shop Featured Items
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AnilStore;