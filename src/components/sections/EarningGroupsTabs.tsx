import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export default function EarningGroupsTabs() {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 5 });

  const startGame = () => {
    setGameStarted(true);
    toast({ 
      title: "🎮 Игра начинается!", 
      description: "Используйте WASD для передвижения!" 
    });
  };

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (key === 'w' && prev.y > 0) newY = prev.y - 1;
        if (key === 's' && prev.y < 9) newY = prev.y + 1;
        if (key === 'a' && prev.x > 0) newX = prev.x - 1;
        if (key === 'd' && prev.x < 9) newX = prev.x + 1;

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

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
            <TabsTrigger value="gamecreate" className="text-lg font-bold">СОЗДАНИЕ ИГР</TabsTrigger>
            <TabsTrigger value="zombiefarm" className="text-lg font-bold">🧟 ЗОМБИ ФЕРМА</TabsTrigger>
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
          <TabsContent value="games" className="mt-6" style={{display: 'none'}}>
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
                {!gameStarted ? (
                <div className="w-full h-[600px] relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/877aa321-4a6c-40b2-b3c9-e997bbcb3147.jpg)'
                    }}
                  ></div>
                  
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12">
                    <img 
                      src="https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/b2d8c120-e678-4d31-b5ec-8eac4cb843ec.png"
                      alt="Character"
                      className="h-96 w-auto drop-shadow-2xl object-fill rounded-lg"
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

                  <div className="absolute bottom-4 right-4">
                    <Button 
                      className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold text-lg px-8 py-6 shadow-2xl border-4 border-yellow-600 flex items-center gap-2"
                      onClick={startGame}
                    >
                      <img src="https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/ca32f5b8-a860-4a33-86c3-695feb38b7ea.png" alt="Logo" className="w-6 h-6" />
                      НАЧАТЬ
                    </Button>
                  </div>

                </div>
                ) : (
                  <div className="w-full h-[600px] relative overflow-hidden bg-gradient-to-b from-green-600 to-green-800">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border-2 border-yellow-600">
                      <h3 className="text-sm font-bold text-gray-700">Позиция: X:{playerPos.x} Y:{playerPos.y}</h3>
                      <p className="text-xs text-gray-600 mt-1">WASD - Движение</p>
                    </div>

                    <div className="absolute top-4 right-4">
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2"
                        onClick={() => {
                          setGameStarted(false);
                          setPlayerPos({ x: 5, y: 5 });
                        }}
                      >
                        ✕ Выход
                      </Button>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="grid grid-cols-10 gap-1 bg-black/20 p-4 rounded-lg">
                        {Array.from({ length: 100 }).map((_, idx) => {
                          const x = idx % 10;
                          const y = Math.floor(idx / 10);
                          const isPlayer = x === playerPos.x && y === playerPos.y;
                          const isGrass = (x + y) % 2 === 0;

                          return (
                            <div
                              key={idx}
                              className={`w-12 h-12 flex items-center justify-center text-2xl border border-gray-600 transition-all ${
                                isGrass ? 'bg-green-500' : 'bg-green-600'
                              } ${isPlayer ? 'ring-4 ring-yellow-400' : ''}`}
                            >
                              {isPlayer && (
                                <img 
                                  src="https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/bucket/b2d8c120-e678-4d31-b5ec-8eac4cb843ec.png"
                                  alt="Player"
                                  className="w-10 h-10 object-cover"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="zombiefarm" className="mt-6">
            <Card className="border-4 border-green-600 bg-gradient-to-br from-gray-900 to-green-950">
              <CardHeader>
                <CardTitle className="text-3xl text-green-400 flex items-center gap-3">
                  <img 
                    src="https://cdn.poehali.dev/projects/e110bdf8-428a-48b0-943e-28d07f28548f/files/a9c3619e-da92-4a11-8b07-da358e55655b.jpg" 
                    alt="Zombie Farm"
                    className="w-12 h-12 rounded-lg"
                  />
                  ЗОМБИ ФЕРМА
                </CardTitle>
                <CardDescription className="text-green-200 text-lg">Выращивай зомби и зарабатывай!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/40 border-2 border-green-600 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">🧟</div>
                    <div className="text-green-400 font-bold">Зомби: 0</div>
                  </div>
                  <div className="bg-black/40 border-2 border-yellow-600 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">🌾</div>
                    <div className="text-yellow-400 font-bold">Урожай: 0</div>
                  </div>
                  <div className="bg-black/40 border-2 border-purple-600 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <div className="text-purple-400 font-bold">Монеты: 100</div>
                  </div>
                </div>

                <div className="bg-black/60 border-2 border-green-700 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-bold text-green-400 mb-4">🏪 МАГАЗИН ЗОМБИ</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-900/50 border border-green-600 rounded-lg p-4">
                      <div className="text-3xl mb-2">🧟‍♂️</div>
                      <div className="text-white font-bold mb-1">Рабочий Зомби</div>
                      <div className="text-green-300 text-sm mb-3">+1 урожай/час</div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                        Купить (50💰)
                      </Button>
                    </div>
                    <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-4">
                      <div className="text-3xl mb-2">🧟‍♀️</div>
                      <div className="text-white font-bold mb-1">Быстрый Зомби</div>
                      <div className="text-yellow-300 text-sm mb-3">+3 урожай/час</div>
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold">
                        Купить (150💰)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-black/60 border-2 border-red-700 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-red-400 mb-4">⚡ УЛУЧШЕНИЯ</h4>
                  <ul className="space-y-3 text-white">
                    <li className="flex items-center justify-between bg-red-900/30 p-3 rounded">
                      <span>🔥 Ускорение фермы</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">200💰</Button>
                    </li>
                    <li className="flex items-center justify-between bg-red-900/30 p-3 rounded">
                      <span>💪 Сила зомби x2</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">500💰</Button>
                    </li>
                    <li className="flex items-center justify-between bg-red-900/30 p-3 rounded">
                      <span>🌟 Автосбор урожая</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">1000💰</Button>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}