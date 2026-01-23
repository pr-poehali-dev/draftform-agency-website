import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InvestmentDialog({ open, onOpenChange }: InvestmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-background border-4 border-primary">
        <DialogHeader>
          <DialogTitle className="text-3xl text-primary text-center mb-2">ИНВЕСТИЦИОННЫЕ ПЛАНЫ</DialogTitle>
          <DialogDescription className="text-center text-lg text-foreground">
            Выберите подходящий план для инвестирования
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
              investment: '25 000₽',
              return: '32 500₽',
              period: '3 месяца',
              profit: '30%',
              color: 'primary'
            },
            {
              name: 'ОПТИМАЛЬНЫЙ',
              investment: '50 000₽',
              return: '70 000₽',
              period: '6 месяцев',
              profit: '40%',
              color: 'secondary',
              featured: true
            },
            {
              name: 'ПРОФИ',
              investment: '100 000₽',
              return: '150 000₽',
              period: '6 месяцев',
              profit: '50%',
              color: 'secondary'
            },
            {
              name: 'БИЗНЕС',
              investment: '250 000₽',
              return: '400 000₽',
              period: '12 месяцев',
              profit: '60%',
              color: 'accent'
            },
            {
              name: 'VIP',
              investment: '500 000₽',
              return: '900 000₽',
              period: '12 месяцев',
              profit: '80%',
              color: 'accent',
              featured: true
            }
          ].map((plan, i) => (
            <Card key={i} className={`border-4 ${plan.featured ? 'border-secondary shadow-xl scale-105' : 'border-primary'} bg-card`}>
              <CardHeader>
                <div className="text-center mb-4">
                  <Badge className={`${plan.featured ? 'bg-secondary' : `bg-${plan.color}`} text-white text-lg px-4 py-2`}>
                    {plan.name}
                  </Badge>
                </div>
                <CardTitle className={`text-4xl text-center ${plan.featured ? 'text-secondary' : 'text-primary'}`}>
                  {plan.investment}
                </CardTitle>
                <CardDescription className="text-center text-lg text-foreground mt-2">
                  Инвестиция
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Возврат:</span>
                    <span className="text-xl font-bold text-primary">{plan.return}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Срок:</span>
                    <span className="text-xl font-bold">{plan.period}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Прибыль:</span>
                    <span className="text-2xl font-bold text-accent">{plan.profit}</span>
                  </div>
                </div>
                <Button className={`w-full ${plan.featured ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'} text-white font-bold text-lg`}>
                  ИНВЕСТИРОВАТЬ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
