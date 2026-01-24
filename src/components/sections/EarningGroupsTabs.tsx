import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function EarningGroupsTabs() {
  const { toast } = useToast();

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">ГРУППЫ ЗАРАБОТКА</h3>
        <Tabs defaultValue="beginner" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-6 bg-background border-4 border-primary">
            <TabsTrigger value="beginner" className="text-lg font-bold">НОВИЧКИ</TabsTrigger>
            <TabsTrigger value="pro" className="text-lg font-bold">ПРО</TabsTrigger>
            <TabsTrigger value="expert" className="text-lg font-bold">ЭКСПЕРТЫ</TabsTrigger>
            <TabsTrigger value="investments" className="text-lg font-bold">ИНВЕСТИЦИИ</TabsTrigger>
            <TabsTrigger value="games" className="text-lg font-bold">ИГРЫ</TabsTrigger>
            <TabsTrigger value="gamecreate" className="text-lg font-bold">СОЗДАНИЕ ИГР</TabsTrigger>
          </TabsList>
          <TabsContent value="beginner" className="mt-6">
            <Card className="border-4 border-primary bg-background">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">УРОВЕНЬ: НОВИЧОК</CardTitle>
                <CardDescription className="text-foreground text-lg">Начните свой путь в мире заработка</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">✓</Badge>
                    <span>Базовые курсы Photoshop</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">✓</Badge>
                    <span>Первые заказы до 5000₽</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">✓</Badge>
                    <span>Поддержка наставника</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                  ПРИСОЕДИНИТЬСЯ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pro" className="mt-6">
            <Card className="border-4 border-primary bg-background">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">УРОВЕНЬ: ПРО</CardTitle>
                <CardDescription className="text-foreground text-lg">Выходите на новый уровень дохода</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <Badge className="bg-secondary text-white">✓</Badge>
                    <span>Продвинутые техники обработки</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Badge className="bg-secondary text-white">✓</Badge>
                    <span>Заказы от 10000₽</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Badge className="bg-secondary text-white">✓</Badge>
                    <span>Работа с брендами</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-white font-bold text-lg">
                  ПРИСОЕДИНИТЬСЯ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expert" className="mt-6">
            <Card className="border-4 border-primary bg-background">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">УРОВЕНЬ: ЭКСПЕРТ</CardTitle>
                <CardDescription className="text-foreground text-lg">Максимальный заработок и престиж</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">✓</Badge>
                    <span>Эксклюзивные проекты</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">✓</Badge>
                    <span>Заказы от 25000₽</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">✓</Badge>
                    <span>VIP статус в сообществе</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                  ПРИСОЕДИНИТЬСЯ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="investments" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'СТАРТ',
                  investment: '100₽',
                  return: '200₽',
                  period: '3 месяца',
                  profit: '5%',
                  color: 'primary'
                },
                {
                  name: 'БАЗОВЫЙ',
                  investment: '1 000₽',
                  return: '1 200₽',
                  period: '3 месяца',
                  profit: '20%',
                  color: 'secondary'
                },
                {
                  name: 'ПРОДВИНУТЫЙ',
                  investment: '5 000₽',
                  return: '7 500₽',
                  period: '6 месяцев',
                  profit: '50%',
                  color: 'primary'
                },
                {
                  name: 'ПРОФИ',
                  investment: '10 000₽',
                  return: '20 000₽',
                  period: '6 месяцев',
                  profit: '100%',
                  color: 'accent'
                },
                {
                  name: 'ЭКСПЕРТ',
                  investment: '25 000₽',
                  return: '62 500₽',
                  period: '12 месяцев',
                  profit: '150%',
                  color: 'secondary'
                },
                {
                  name: 'VIP',
                  investment: '50 000₽',
                  return: '150 000₽',
                  period: '12 месяцев',
                  profit: '200%',
                  color: 'primary'
                }
              ].map((plan, i) => (
                <Card key={i} className={`border-4 border-${plan.color} bg-background hover:bg-muted transition-colors`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl text-${plan.color}`}>{plan.name}</CardTitle>
                    <CardDescription className="text-foreground text-lg">
                      Инвестируйте и получайте прибыль
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-muted-foreground">Вложение:</span>
                      <span className="font-bold text-foreground">{plan.investment}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-muted-foreground">Возврат:</span>
                      <span className={`font-bold text-${plan.color}`}>{plan.return}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-muted-foreground">Срок:</span>
                      <span className="font-bold text-foreground">{plan.period}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-muted-foreground">Доходность:</span>
                      <Badge className={`bg-${plan.color} text-white text-base px-3 py-1`}>
                        {plan.profit}
                      </Badge>
                    </div>
                    <Button className={`w-full bg-${plan.color} hover:bg-${plan.color}/90 text-white font-bold text-lg mt-4`}>
                      ИНВЕСТИРОВАТЬ
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="games" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: '🧟 ЗОМБИ МАНИЯ',
                  description: 'Сражайся с полчищами зомби',
                  url: 'https://ok.ru/game/zombiemania',
                  emoji: '🧟‍♂️'
                },
                {
                  title: '🚜 ФЕРМА СОСЕДИ',
                  description: 'Создай свою идеальную ферму',
                  url: 'https://ok.ru/game/farmneighbors',
                  emoji: '🌾'
                },
                {
                  title: '🏝️ КЛОНДАЙК',
                  description: 'Золотая лихорадка на Аляске',
                  url: 'https://ok.ru/game/klondike',
                  emoji: '⛏️'
                },
                {
                  title: '🎣 МОЕЙ РЫБКЕ',
                  description: 'Стань лучшим рыбаком',
                  url: 'https://ok.ru/game/fishing',
                  emoji: '🐟'
                }
              ].map((game, i) => (
                <Card key={i} className="border-4 border-accent bg-background hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl text-accent text-center">{game.title}</CardTitle>
                    <CardDescription className="text-foreground text-center">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <div className="w-full aspect-video bg-accent/10 flex items-center justify-center rounded-lg border-4 border-accent/30">
                      <span className="text-8xl">{game.emoji}</span>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-xl flex items-center justify-center gap-2"
                      onClick={() => {
                        window.open(game.url, '_blank', 'width=800,height=600');
                        toast({
                          title: `Запуск ${game.title}! 🎮`,
                          description: "Открываем игру в новом окне...",
                        });
                      }}
                    >
                      <Icon name="Play" size={24} />
                      ИГРАТЬ
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="gamecreate" className="mt-6">
            <Card className="border-4 border-accent bg-white">
              <CardContent className="p-0">
                <div className="w-full h-[600px] relative overflow-hidden bg-gradient-to-b from-sky-400 to-sky-200">
                  <div 
                    className="absolute inset-0 bg-cover bg-center animate-clouds-drift"
                    style={{
                      backgroundImage: 'url(https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/4380689e-e32f-49c9-9210-9c0584e47fdf.jpg)',
                      backgroundSize: '200% 100%',
                      opacity: 0.7
                    }}
                  ></div>
                  
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-48 bg-contain bg-repeat-x bg-bottom animate-grass-sway"
                    style={{
                      backgroundImage: 'url(https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/965b174f-63b5-4ec9-ac2e-8510aa2efce1.png)'
                    }}
                  ></div>
                  
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                    <img 
                      src="https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/3b39b254-d93d-4042-b82e-c4590483651b.png"
                      alt="Character"
                      className="h-80 w-auto object-contain drop-shadow-2xl animate-character-idle"
                    />
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border-2 border-accent">
                    <h3 className="text-xl font-bold text-accent mb-2">🏛️ ЛОББИ</h3>
                    <p className="text-sm text-gray-700">Ваш персонаж готов к приключениям!</p>
                    <div className="mt-3 space-y-1 text-xs">
                      <p className="flex items-center gap-2">
                        <span className="text-green-600">❤️ HP:</span>
                        <span className="font-bold">100/100</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-blue-600">⚡ Энергия:</span>
                        <span className="font-bold">100/100</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border-2 border-accent">
                    <h3 className="text-lg font-bold text-accent mb-2">🎮 Управление</h3>
                    <div className="space-y-1 text-xs">
                      <p><span className="font-bold">W A S D</span> - Движение</p>
                      <p><span className="font-bold">Пробел</span> - Прыжок</p>
                      <p><span className="font-bold">E</span> - Действие</p>
                    </div>
                  </div>
                  

                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}