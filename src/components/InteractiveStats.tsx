import { Users, Heart, Star, Zap } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const InteractiveStats = () => {
  const stats = [
    {
      icon: Users,
      value: 50000,
      suffix: '+',
      label: 'Happy Fans',
      color: 'text-anil-primary',
      bgColor: 'bg-anil-primary/10'
    },
    {
      icon: Heart,
      value: 25000,
      suffix: '+',
      label: 'Products Sold',
      color: 'text-amai-primary',
      bgColor: 'bg-amai-primary/10'
    },
    {
      icon: Star,
      value: 4.9,
      suffix: '/5',
      label: 'Customer Rating',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Zap,
      value: 99,
      suffix: '%',
      label: 'Satisfaction Rate',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto modern-text">
            Join our growing community of passionate Tamil cinema fans
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="product-card text-center group hover:scale-105 transition-all duration-500"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:animate-pulse`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-black mb-2 ${stat.color} modern-text`}>
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2500}
                />
              </div>
              <p className="text-sm text-muted-foreground font-medium modern-text">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};