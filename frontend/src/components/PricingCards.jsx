import React from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'Forever',
    description: 'Perfect for getting started',
    icon: Star,
    features: [
      'Access to 50+ free courses',
      'Basic course materials',
      'Community support',
      'Mobile app access',
      'Progress tracking'
    ],
    limitations: [
      'No certificates',
      'Limited course access',
      'No offline downloads'
    ],
    buttonText: 'Get Started Free',
    popular: false,
    buttonVariant: 'outline' 
  },
  {
    name: 'Pro',
    price: 29,
    period: 'per month',
    description: 'Most popular for serious learners',
    icon: Zap,
    features: [
      'Access to 100,000+ courses',
      'All course materials & resources',
      'Completion certificates',
      'Offline download capability',
      'Priority support',
      'Advanced analytics',
      'Mobile & desktop apps',
      'No ads'
    ],
    limitations: [],
    buttonText: 'Start Pro Trial',
    popular: true,
    buttonVariant: 'default' 
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'per month',
    description: 'For teams and organizations',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Team management dashboard',
      'Custom learning paths',
      'Advanced reporting & analytics',
      'SSO integration',
      'Dedicated account manager',
      'API access',
      'Custom branding',
      'Bulk user management',
      '24/7 premium support'
    ],
    limitations: [],
    buttonText: 'Contact Sales',
    popular: false,
    buttonVariant: 'outline' 
  }
];

const PricingCards = () => {
  return (
    <section className="py-20 lg:py-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Pricing Plans
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Learning Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready. All plans include access to our world-class learning platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-2 border-primary shadow-xl scale-105 rounded-3xl'
                    : 'bg-white border-2 border-gray-200 shadow-lg hover:border-primary/30 rounded-2xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Decorative Elements */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full"></div>
                    <div className="absolute top-8 right-8 w-4 h-4 bg-secondary rounded-full"></div>
                    <div className="absolute top-12 right-12 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}

                <div className="p-6 lg:p-8 relative">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular
                        ? 'bg-gradient-to-br from-primary to-secondary shadow-lg'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        plan.popular ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="font-heading text-4xl lg:text-5xl font-bold text-gray-900">₹{plan.price}</span>
                        <span className="text-gray-600 ml-2">/ {plan.period}</span>
                      </div>
                      {plan.price > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          Billed {plan.period === 'per month' ? 'monthly' : 'annually'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features List - Compact */}
                  <div className="space-y-3 mb-6">
                    {plan.features.slice(0, 6).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.features.length > 6 && (
                      <div className="text-center">
                        <span className="text-sm text-primary font-medium">+ {plan.features.length - 6} more features</span>
                      </div>
                    )}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start opacity-60">
                        <div className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-gray-400 text-xs">×</span>
                        </div>
                        <span className="text-sm text-gray-500 line-through">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : plan.buttonVariant === 'outline'
                        ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                        : ''
                    }`}
                  >
                    {plan.buttonText}
                  </Button>

                  {/* Additional Info */}
                  {plan.name === 'Pro' && (
                    <div className="text-center mt-3">
                      <span className="text-xs text-gray-500">7-day free trial • Cancel anytime</span>
                    </div>
                  )}
                  
                  {plan.name === 'Enterprise' && (
                    <div className="text-center mt-3">
                      <span className="text-xs text-gray-500">Custom pricing available</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Questions about our pricing? <a href="#" className="text-primary hover:underline font-medium">Contact our sales team</a> or check our <a href="#" className="text-primary hover:underline font-medium">FAQ</a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;