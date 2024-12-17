import { cn, StepComponentPricePlan } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PricePlanProps {
  id: string
  title: string
  description: string
  price: number
  descount?: number
  currency?: string
  highlight?: boolean
  text_highlight?: string
  url?: string
}

export function PricePlanItem({
  id,
  title,
  description,
  price,
  descount,
  currency = "R$",
  highlight = false,
  text_highlight,
  url
}: PricePlanProps & StepComponentPricePlan) {
  const originalPrice = descount ? price + descount : price

  return (
    <Card 
      className={cn(
        "relative w-full transition-colors", 
        highlight && "bg-primary text-primary-foreground"
      )}
    >
      {highlight && (
        <div className="absolute -top-3 left-0 right-0 text-center">
          <span className="bg-primary px-4 py-1 text-xs font-medium uppercase text-primary-foreground rounded-full">
            {text_highlight || 'Mais Popular'}
          </span>
        </div>
      )}
      <label
        htmlFor={id}
        className={cn(
          "flex items-center justify-between p-4 cursor-pointer",
          highlight && "text-primary-foreground"
        )}
      >
        <div className="flex items-center gap-4">
          <RadioGroupItem 
            value={id} 
            id={id}
            className={cn(
              highlight && "[&_span]:text-primary-foreground"
            )}
          />
          <div className="space-y-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">
              {description}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-sm">{currency}</span>
            <span className="text-2xl font-bold">{price ? price.toFixed(2) : 'Gratis'}</span>
          </div>
          {!!(descount && originalPrice && currency) && (
            <div className="text-sm text-muted-foreground line-through">
              {currency}{originalPrice.toFixed(2)}
            </div>
          )}
        </div>
      </label>
    </Card>
  )
}

