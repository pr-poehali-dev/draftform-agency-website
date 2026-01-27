import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface HeroSectionProps {
  onInvestmentsClick: () => void;
}

export default function HeroSection({ onInvestmentsClick }: HeroSectionProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });
  const emojis = ['😊', '🎮', '🚀', '💪', '⭐', '🔥', '✨', '🎯'];
  const [currentEmoji, setCurrentEmoji] = useState('😊');

  const handleCharacterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setEmojiPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 2000);
  };
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-block mb-6">
          <img 
            src="https://cdn.poehali.dev/files/53967b14-d4ed-488e-85b2-bb1893d40108.png" 
            alt="Hero Logo" 
            className="w-32 h-32 mx-auto mb-6 pixelated animate-pulse"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <h2 className="text-3xl md:text-5xl mb-6 text-primary leading-relaxed">
          АГЕНТСТВО<br/>ДРАФОРМАЦИЯ
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-foreground max-w-2xl mx-auto">
          Ваш путь к заработку через Photoshop и креатив
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8">
            НАЧАТЬ РАБОТУ
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-lg px-8">
            УЗНАТЬ БОЛЬШЕ
          </Button>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-8 flex items-center gap-2" onClick={onInvestmentsClick}>
            <Icon name="TrendingUp" size={24} />
            ИНВЕСТИЦИИ
          </Button>
        </div>
      </div>
    </section>
  );
}