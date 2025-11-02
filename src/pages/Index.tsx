import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="halloween-bg fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-float">🎃</div>
        <div className="absolute top-20 right-20 text-5xl animate-float-delay">👻</div>
        <div className="absolute top-40 left-1/4 text-4xl animate-float">🎃</div>
        <div className="absolute top-60 right-1/3 text-6xl animate-float-delay">👻</div>
        <div className="absolute bottom-40 left-1/3 text-5xl animate-float">🎃</div>
        <div className="absolute bottom-20 right-1/4 text-4xl animate-float-delay">👻</div>
        <div className="absolute top-1/2 left-10 text-5xl animate-float-delay">🎃</div>
        <div className="absolute top-3/4 right-10 text-6xl animate-float">👻</div>
      </div>
      <div className="relative z-10">
      <nav className="border-b-4 border-primary bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/files/53967b14-d4ed-488e-85b2-bb1893d40108.png" 
              alt="Logo" 
              className="w-12 h-12 pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
            <h1 className="text-xl md:text-2xl text-primary">ДРАФОРМАЦИЯ</h1>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold">
            ВОЙТИ
          </Button>
        </div>
      </nav>

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
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">НАШИ УСЛУГИ</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'DollarSign', title: 'ЗАРАБОТОК', desc: 'Помогаем монетизировать ваши навыки' },
              { icon: 'Image', title: 'PHOTOSHOP', desc: 'Профессиональная работа с графикой' },
              { icon: 'Users', title: 'КОМАНДА', desc: 'Работайте с лучшими специалистами' },
              { icon: 'Sparkles', title: 'КРЕАТИВ', desc: 'Уникальные решения для бизнеса' },
              { icon: 'TrendingUp', title: 'РОСТ', desc: 'Развиваемся вместе с вами' },
              { icon: 'Award', title: 'КАЧЕСТВО', desc: 'Гарантия результата' }
            ].map((service, i) => (
              <Card key={i} className="border-4 border-primary bg-background hover:bg-muted transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  <CardDescription className="text-foreground text-lg">{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">СОЦИАЛЬНЫЕ СЕТИ</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: 'MessageCircle', name: 'TELEGRAM', link: '#' },
              { icon: 'Share2', name: 'VK', link: '#' },
              { icon: 'Youtube', name: 'YOUTUBE', link: '#' }
            ].map((social, i) => (
              <Card key={i} className="border-4 border-secondary bg-card hover:bg-muted transition-colors cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <div className="w-20 h-20 bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Icon name={social.icon} size={40} className="text-white" />
                  </div>
                  <p className="text-xl font-bold text-secondary">{social.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">ГРУППЫ ЗАРАБОТКА</h3>
          <Tabs defaultValue="beginner" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-background border-4 border-primary">
              <TabsTrigger value="beginner" className="text-lg font-bold">НОВИЧКИ</TabsTrigger>
              <TabsTrigger value="pro" className="text-lg font-bold">ПРО</TabsTrigger>
              <TabsTrigger value="expert" className="text-lg font-bold">ЭКСПЕРТЫ</TabsTrigger>
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
          </Tabs>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">ЗАЯВКА НА PHOTOSHOP</h3>
          <Card className="border-4 border-secondary bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">ОСТАВЬТЕ ЗАЯВКУ</CardTitle>
              <CardDescription className="text-foreground text-lg">Мы свяжемся с вами в течение 24 часов</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-lg font-bold">ИМЯ</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-2 border-primary bg-background text-foreground text-lg"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg font-bold">EMAIL</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-2 border-primary bg-background text-foreground text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg font-bold">ОПИСАНИЕ ПРОЕКТА</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="border-2 border-primary bg-background text-foreground text-lg min-h-32"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg">
                  ОТПРАВИТЬ ЗАЯВКУ
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">НАША КОМАНДА</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'МИХАИЛ.М.М', role: 'Директор АГ,ДФ', emoji: '👨‍💼' },
              { name: 'МАРИЯ', role: 'ДИЗАЙНЕР', emoji: '👩‍🎨' },
              { name: 'ИВАН', role: 'DEVELOPER', emoji: '👨‍💻' },
              { name: 'АННА', role: 'МЕНЕДЖЕР', emoji: '👩‍💼' }
            ].map((member, i) => (
              <Card key={i} className="border-4 border-primary bg-background text-center hover:scale-105 transition-transform">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {member.emoji === '👨‍💼' ? (
                      <img 
                        src="https://cdn.poehali.dev/files/eea02a94-b3d5-42d6-a793-054991dbfd68.jpg" 
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                      />
                    ) : (
                      <span className="text-6xl">{member.emoji}</span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                  <p className="text-secondary text-lg">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-4xl mb-12 text-center text-primary">ПЛАТНАЯ ПОДПИСКА</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: 'БАЗОВАЯ', 
                price: '990₽', 
                features: ['Доступ к курсам', 'Чат поддержки', 'Базовые материалы'],
                color: 'primary'
              },
              { 
                name: 'ПРЕМИУМ', 
                price: '2990₽', 
                features: ['Все курсы', 'Персональный наставник', 'Приоритет в заказах', 'Сертификат'],
                color: 'secondary',
                featured: true
              },
              { 
                name: 'VIP', 
                price: '5990₽', 
                features: ['Всё из ПРЕМИУМ', 'Закрытые мастер-классы', 'Личный менеджер', 'Эксклюзивные проекты'],
                color: 'primary'
              }
            ].map((plan, i) => (
              <Card key={i} className={`border-4 ${plan.featured ? 'border-secondary scale-105 shadow-2xl' : 'border-primary'} bg-background relative`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-white px-4 py-2 text-sm">ПОПУЛЯРНО</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className={`text-2xl ${plan.featured ? 'text-secondary' : 'text-primary'}`}>{plan.name}</CardTitle>
                  <div className="text-4xl font-bold mt-4 mb-2 text-foreground">{plan.price}</div>
                  <p className="text-muted-foreground">в месяц</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className={plan.featured ? 'text-secondary' : 'text-primary'} />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.featured ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'} text-white font-bold text-lg`}>
                    ПОДКЛЮЧИТЬ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-primary bg-card py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <img 
              src="https://cdn.poehali.dev/files/53967b14-d4ed-488e-85b2-bb1893d40108.png" 
              alt="Footer Logo" 
              className="w-16 h-16 mx-auto pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <h4 className="text-2xl text-primary mb-4">ДРАФОРМАЦИЯ</h4>
          <p className="text-lg mb-6">Агентство заработка и креатива</p>
          <div className="flex justify-center gap-6 mb-6">
            <Button variant="outline" size="icon" className="border-2 border-primary">
              <Icon name="MessageCircle" size={24} />
            </Button>
            <Button variant="outline" size="icon" className="border-2 border-primary">
              <Icon name="Share2" size={24} />
            </Button>
            <Button variant="outline" size="icon" className="border-2 border-primary">
              <Icon name="Youtube" size={24} />
            </Button>
          </div>
          <p className="text-muted-foreground">© 2024 ДРАФОРМАЦИЯ. Все права защищены.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}