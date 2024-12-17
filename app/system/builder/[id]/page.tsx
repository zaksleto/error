"use client"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { 
    HandIcon,
    ChartBarIcon,
    MessageCircle,
    ChartLineIcon,
    SpeakerIcon,
    ImagePlus,
    VideoIcon,
    ChevronDownIcon,
    DollarSign,
    MessageCircleQuestion,
    CalendarIcon, ChartPie, ChartPieIcon, ClockIcon, Eye, ImageIcon, MoveLeft, MoveLeftIcon, Palette, Pencil, Plus, PlusIcon, Save, Share2, TextIcon, Wrench, 
    Route,
    Box,
    AlertCircle,
    ChevronUp,
    ChevronDown,
    FileInput,
    Filter,
    Copy,
    PencilIcon,
    Trash,
    MousePointer,
    RotateCcw,
    StarIcon,
    Expand,
    ArrowRight,
    GripVertical,
    Code,
    BellIcon,
    Weight,
    WeightIcon,
    Ruler,
    Hash
} from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AnyStepComponent, cn, Funil, FunilStructure, Priority, Status, Step, StepComponent, StepComponentAccordion, StepComponentAlert, StepComponentAudio, StepComponentBenefits, StepComponentButton, StepComponentCarrousel, StepComponentChartCircles, StepComponentChartLine, StepComponentFeedback, StepComponentForm, StepComponentHeight, StepComponentImage, StepComponentLevel, StepComponentNotification, StepComponentPrice, StepComponentPricePlan, StepComponentProgress, StepComponentQuestions, StepComponentScript, StepComponentSpacer, StepComponentText, StepComponentTimer, StepComponentType, StepComponentVideo, StepComponentWeight, Tag } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { stepComponents } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ColorPicker } from "@/components/ui/color-picker"
import { format } from "date-fns"
// ptBR locale
import { ca, ptBR } from "date-fns/locale"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ColumnDef } from "@tanstack/react-table"
import { Progress } from "@/components/ui/progress"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Editor from "@/components/system/editor";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FunisAnalytics } from "@/components/system/funis-analytics"
import ListResults from "@/components/system/list-results"
import { PricePlanItem } from "@/components/system/pricing-plan-item"
import { AudioListener } from "@/components/system/audio-listener"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { CircularProgress } from "@/components/system/circular-progress"
import { toast } from "@/hooks/use-toast"
import { DndProvider, useDrag, useDragLayer, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const safeFormatDate = (date: Date | string | Timestamp | undefined) => {
    try {
        return format(parseDate(date), "PPP", {
            locale: ptBR,
        })
    } catch (error) {
        return 'Erro ao formatar a data'
    }
}
const parseDate = (date: Date | string | Timestamp | undefined) => {
    try {
        if (!date) return new Date()
        if (date instanceof Timestamp) {
            return new Date(date.seconds * 1000)
        }
        const parsedDate = new Date(date)

        // if is valid date
        if (parsedDate instanceof Date) {
            return parsedDate
        }

        return new Date()
    } catch (error) {
        console.error(error)
        return new Date()
    }
}

const stepComponentsIcons: Record<StepComponentType, React.FC<React.SVGAttributes<SVGElement>>> = {
  text: TextIcon,
  timer: ClockIcon,
  image: ImageIcon,
  spacer: PlusIcon,
  benefits: ChartPieIcon,
  button: HandIcon,
  progress: ChartBarIcon,
  feedback: MessageCircle,
  chart: ChartLineIcon,
  audio: SpeakerIcon,
  carrousel: ImagePlus,
  video: VideoIcon,
  accordion: ChevronDownIcon,
  price: DollarSign,
  questions: MessageCircleQuestion,
  chart_circles: ChartPieIcon,
  form: FileInput,
  alert: AlertCircle,
  script: Code,
  notification: BellIcon,
  weight: Weight,
  height: Ruler,
  level: Hash
}
const stepComponentsNames: Record<StepComponentType, string> = {
    text: 'Texto',
    timer: 'Timer',
    image: 'Imagem',
    spacer: 'Espaço',
    benefits: 'Benefícios',
    button: 'Botão',
    progress: 'Progresso',
    feedback: 'Feedback',
    chart: 'Gráfico',
    audio: 'Áudio',
    carrousel: 'Carrossel',
    video: 'Vídeo',
    accordion: 'Acordião',
    price: 'Preço',
    questions: 'Questões',
    chart_circles: 'Gráfico Circular',
    form: 'Formulário',
    alert: 'Alerta',
    script: 'Script',
    notification: 'Notificação',
    weight: 'Peso',
    height: 'Altura',
    level: 'Nível'
}
const stepComponentsJSX = {
    alert: (props: StepComponentAlert) => {
        const { text, color, bg_color } = props
        return <div className="w-full flex flex-col gap-2 text-center py-4 px-6 rounded-md" style={{
            backgroundColor: bg_color,
        }}>
            <span className="text-md text-muted-foreground" style={{
                color
            }}>
                {text}
            </span>
        </div>
    },
    script: (props: StepComponentScript) => {
        const { script } = props
        return <div className="w-full flex flex-col gap-2 text-center">
            <code className="text-sm overflow-auto text-neutral-100 bg-neutral-800 p-2 rounded-md">{script.trim()}</code>
        </div>
    },
    text: (props: StepComponentText) => {
        const { headline, description, color, type } = props
        return <div className="w-full flex flex-col gap-2 text-center">
            <h2 className="text-lg font-semibold" style={{
                color
            }} dangerouslySetInnerHTML={{
                __html: headline
            }}></h2>
        </div>
    },
    image: (props: StepComponentImage) => {
        const { src, alt } = props
        return <div className="w-full flex flex-col gap-2 text-center">
            <img src={src} alt={alt} className="" />
            <span className="text-sm text-muted-foreground">
                {alt}
            </span>
        </div>
    },
    timer: React.forwardRef(function Timer(props: StepComponentTimer, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            type,
            headline,
            description,
            end_description,
            duration,
            date: unparsedDate,
            use,
            text_color,
            bg_color,
            reset
        } = props
        const [remainingText, setRemainingText] = React.useState<string>(`${0}d ${0}h ${0}m ${0}s`)
        const [done, setDone] = React.useState<boolean>(false)

        React.useEffect(() => {
            const initalRenderDate = new Date()
            const date = parseDate(unparsedDate || new Date())

            if (use === 'date' && date && date instanceof Date) {
                const setTime = () => {
                    const now = new Date()
                    const diff = date.getTime() - now.getTime()
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                    if (Number.isNaN(days) || Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
                        setRemainingText('Erro ao calcular o tempo')
                        return
                    }
                    setRemainingText(`${days}d ${hours}h ${minutes}m ${seconds}s`)
                }
                const interval = setInterval(setTime, 1000)
                setTime()
                return () => clearInterval(interval)
            } else if (use === 'duration' && duration) {
                // make it a countdown
                let countSeconds = duration
                const setTime = () => {
                    countSeconds -= 1
                    setRemainingText(`${Math.floor(countSeconds / 60)}m ${countSeconds % 60}s`)
                    if (countSeconds <= 0) {
                        setDone(true)
                        clearInterval(interval)
                    }
                }
                const interval = setInterval(setTime, 1000)
                setTime()
                return () => clearInterval(interval)
            }
        }, [reset, unparsedDate, duration, use])

        return <div ref={ref} className="w-full flex flex-col gap-2 py-2 text-center rounded-md" style={{
            backgroundColor: bg_color,
        }}>
            {
                !done ? (
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="text-md font-semibold" style={{
                            color: text_color,
                        }}>
                            {headline}
                            <br />
                            <span className="text-sm opacity-50">
                                {description}
                            </span>
                        </div>
                        <div className="text-md font-medium" style={{
                            color: text_color,
                        }}>
                            {remainingText}
                        </div>
                    </div>
                ) : (
                    <span className="text-sm font-medium" style={{
                        color: text_color,
                    }}>
                        {end_description}
                    </span>
                )
            }
        </div>
    }),
    spacer: React.forwardRef(function Spacer(props: StepComponentSpacer, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            height,
        } = props
        return <Separator ref={ref} className="w-full" style={{
            marginTop: height,
            marginBottom: height,
        }} />
    }),
    benefits: React.forwardRef(function Benefits(props: StepComponentBenefits, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            headline,
            description,
            comparisons,
            benefits,
        } = props
        
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <Table>
                <TableCaption>{description}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">{headline}</TableHead>
                        {
                            comparisons.map((comparison) => {
                                return <TableHead className="text-center" key={comparison}>{comparison}</TableHead>
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        Object.entries(benefits).map(([rowId, row]) => (
                            <TableRow key={rowId}>
                                <TableCell className="font-medium">{row.title}</TableCell>
                                {
                                    row.comparisons.map((comparison) => {
                                        return <TableCell key={comparison+rowId}>{comparison}</TableCell>
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    }),
    button: React.forwardRef(function ButtonComponent(props: StepComponentButton, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            label,
            destiny,
            facebook_event,
            facebook_custom_event,
            delay,
            destiny_url,
            color
        } = props
        const [remainingDelay, setRemainingDelay] = React.useState<number>(delay || 0)
        React.useEffect(() => {
            setRemainingDelay(delay || 0)
            // incrementally decrease the remaining delay
            const interval = setInterval(() => {
                setRemainingDelay(prevRemainingDelay => {
                    if (prevRemainingDelay <= 0) {
                        clearInterval(interval)
                        return 0
                    }
                    return prevRemainingDelay - 1
                })
            }, 1000)
            return () => clearInterval(interval)
        }, [delay])
        const handleClick = () => {
            if (destiny === 'next') {
                alert('next')
            } else if (destiny === 'url' && destiny_url) {
                if (!destiny_url) return alert('URL não informada')
                window.open(destiny_url, '_blank')
            }
        }
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <Button 
                disabled={remainingDelay > 0} 
                onClick={handleClick} 
                className="w-full" 
                style={{
                    backgroundColor: color,
                }}
            >
                {remainingDelay > 0 ? `${remainingDelay}s` : label}
            </Button>
        </div>
    }),
    progress: React.forwardRef(function ProgressComponent(props: StepComponentProgress, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            title,
            final_progress,
            duration,
        } = props
        const [progress, setProgress] = React.useState<number>(0)
        React.useEffect(() => {
            setProgress(final_progress)
        }, [duration])

        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <div className="w-full text-center">{title}</div>
            <Progress value={progress} duration={duration * 1000} className="w-full" />
        </div>
    }),
    feedback: React.forwardRef(function FeedbackComponent(props: StepComponentFeedback, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            carousel,
            feedbacks,
        } = props
        
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center px-10">
            <Carousel orientation={carousel ? 'horizontal' : 'vertical'} className="w-full relative">
                <CarouselContent>
                    {
                        feedbacks.map((feedback, index) => {
                            return <CarouselItem key={feedback.id}>
                                <div className="p-1">
                                    <Card className="w-full">
                                        <CardContent className="p-2">
                                            <CardHeader className="flex flex-col gap-2 items-center justify-center">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={feedback.avatar_src} alt={feedback.title} />
                                                    <AvatarFallback>{index+1}.</AvatarFallback>
                                                </Avatar>
                                                <CardTitle>
                                                    {feedback.title}
                                                    <br />
                                                    <span className="text-sm text-muted-foreground">
                                                        {feedback.social}
                                                    </span>
                                                </CardTitle>
                                                <CardDescription>
                                                    {
                                                        feedback.stars > 0 && (
                                                            <div className="flex flex-row items-center justify-center gap-2 mb-2">
                                                                {
                                                                    new Array(feedback.stars).fill(0).map((_, index) => {
                                                                        return <StarIcon fill="currentColor" key={index} className="h-4 w-4 text-yellow-300" />
                                                                    })
                                                                }
                                                                {
                                                                    new Array(5 - feedback.stars).fill(0).map((_, index) => {
                                                                        return <StarIcon fill="#d1d5db" key={index} className="h-4 w-4 text-gray-300" />
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    <div>
                                                        {feedback.description}
                                                    </div>
                                                </CardDescription> 
                                            </CardHeader>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                {
                    carousel && (
                        <>
                            <CarouselPrevious />
                            <CarouselNext />
                        </>
                    )
                }
            </Carousel>
        </div>
    }),
    price: React.forwardRef(function PriceComponent(props: StepComponentPrice, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            plans,
            button_text,
            border_radius,
            color,
            text_highlight
        } = props
        const [selectedPlan, setSelectedPlan] = React.useState<StepComponentPricePlan | null>(null)
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <RadioGroup value={
                selectedPlan?.id
            } onValueChange={
                (value) => setSelectedPlan(plans.find(plan => plan.id === value) || null)
            } className="space-y-4 w-full max-w-md mx-auto">
                {
                    plans.map((plan) => {
                        return <PricePlanItem
                         key={plan.id} 
                         id={plan.id}
                         title={plan.title}
                         description={plan.description}
                         price={Number(plan.price) || 0}
                         descount={Number(plan.descount) || 0}
                         currency={plan.currency}
                         highlight={plan.highlight || false}
                         text_highlight={text_highlight} 
                        />
                    })
                }
            </RadioGroup>
            <Button className="w-full mt-2 " disabled={!selectedPlan} onClick={() => window.open(selectedPlan?.url, '_blank')}>
                {button_text || 'Comprar'}
            </Button>
        </div>
    }),
    video: React.forwardRef(function VideoComponent(props: StepComponentVideo, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            url,
            iframe,
            id,
        } = props
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            {
                iframe && (
                    <div className="w-full iframe-container" dangerouslySetInnerHTML={{
                        __html: iframe
                    }}>
                    </div>
                )
            }
            {
                url && (
                    <div className="w-full">
                        <video controls className="w-full">
                            <source src={url} type="video/mp4" />
                        </video>
                    </div>
                )
            }
        </div>
    }),
    audio: React.forwardRef(function AudioComponent(props: StepComponentAudio, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            src,
            avatar,
        } = props
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <AudioListener src={src} avatar={avatar} type="audio" />
        </div>
    }),
    chart: React.forwardRef(function ChartComponent(props: StepComponentChartLine, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            data,
            color
        } = props
        const chartConfig = {
            value: {
                label: "Valor",
                color: color || "hsl(var(--chart-1))",
            },
        } satisfies ChartConfig
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            
            <ChartContainer config={chartConfig}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    accessibilityLayer
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        interval={0}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)+(value.length > 3 ? '.' : '')}
                    />
                    <Line 
                        dataKey="value"
                        type="linear"
                        strokeWidth={2}
                        stroke={color}
                        dot={false} 
                    />
                </LineChart>
            </ChartContainer>
        </div>
    }),
    chart_circles: React.forwardRef(function ChartCirclesComponent(props: StepComponentChartCircles, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            data,
            n_columns
        } = props
        // this components renders a list of circular progress charts, in a grid
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <div className={`grid grid-cols-${n_columns} gap-6 text-center`}>
                {
                    data.map((progress, index) => {
                        return <div key={index} className="flex flex-col gap-2">
                            <CircularProgress {...progress} type="circle"/>
                        </div>
                    })
                }
            </div>
        </div>
    }),
    accordion: React.forwardRef(function AccordionComponent(props: StepComponentAccordion, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            items
        } = props
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center">
            <Accordion type="single" collapsible className="w-full">
                {
                    items.map((item, index) => {
                        return <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    })
                }
            </Accordion>
        </div>
    }),
    form: React.forwardRef(function FormComponent(props: StepComponentForm, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            items
        } = props
        return <div ref={ref} className="w-full flex flex-col gap-4">
            {
                items.map((item, index) => {
                    return <div key={item.id} className="flex flex-col gap-2">
                        <Label htmlFor={item.id}>{item.label}{' '}{item.required ? <span className="text-destructive">*</span> : ''}</Label>
                        {
                            item.type === 'text' && (
                                <Input value={item.value} id={item.id} placeholder={item.placeholder} />
                            )
                        }
                        {
                            item.type === 'email' && (
                                <Input value={item.value} id={item.id} placeholder={item.placeholder} type="email" />
                            )
                        }
                        {
                            item.type === 'phone' && (
                                <Input value={item.value} id={item.id} placeholder={item.placeholder} type="tel" />
                            )
                        }
                        {
                            item.type === 'number' && (
                                <Input value={item.value} id={item.id} placeholder={item.placeholder} type="number" />
                            )
                        }
                        {
                            item.type === 'textarea' && (
                                <Textarea value={item.value} id={item.id} placeholder={item.placeholder} />
                            )
                        }
                    </div>
                })
            }
        </div>
    }),
    questions: React.forwardRef(function QuestionComponent(props: StepComponentQuestions, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            items,
            render,
            action,
            emoji_position
        } = props

        return <div ref={ref} className={"w-full flex gap-2 text-center "+(render === 'list' ? 'flex-col' : 'flex-row flex-wrap justify-between')}>
            {items.map((item, index) => {
                const EmojiComponent = () => {
                    return <div className={`text-2xl`}>
                        {item.emoji}
                    </div>
                }
                const emoji_position_class = () => {
                    if (emoji_position === 'left') return 'flex-row'
                    if (emoji_position === 'right') return 'flex-row-reverse'
                    if (emoji_position === 'top') return 'flex-col'
                    if (emoji_position === 'bottom') return 'flex-col-reverse'
                    return ''
                }
                return <div key={item.id} 
                className={"px-4 py-2 rounded-md ring-1 ring-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer focus:bg-gray-100 "+(render === 'list' && 'w-full')}
                style={{
                    width: render === 'grid-2' ? 'calc(50% - 0.5rem)' : undefined
                }}
                >
                    {
                        item.image && (
                            <img src={item.image} alt={item.title} className="w-full object-cover p-2" />
                        )
                    }
                    <div className={`${emoji_position_class()} flex flex-row items-center justify-center`}>
                        {
                            item.emoji && (
                                <EmojiComponent />
                            )
                        }
                        <span className="flex flex-row gap-2 items-center">
                            {item.title}
                            {
                                action === 'arrow' && (
                                    <div className="rounded-full bg-slate-100 p-1 shadow-md">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                )
                            }
                            {
                                action === 'checkbox' && (
                                    <Checkbox />
                                )
                            }
                        </span>
                    </div>
                </div>
            })}
        </div>
    }),
    carrousel: React.forwardRef(function CarouselComponent(props: StepComponentCarrousel, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            items
        } = props

        return <div ref={ref} className="w-full flex flex-col gap-2 text-center px-10">
            <Carousel>
                <CarouselContent>
                    {
                        items.map((item, index) => {
                            return <CarouselItem key={item.id}>
                                <div className="p-1">
                                    <Card className="w-full">
                                        <CardContent className="p-2">
                                            <CardHeader className="flex flex-col gap-2 items-center justify-center">
                                                <img src={item.image} alt={item.title} className="w-full object-cover" />
                                                <CardTitle>
                                                    {item.title}
                                                    <br />
                                                    <span className="text-sm text-muted-foreground">
                                                        {item.description}
                                                    </span>
                                                </CardTitle>
                                            </CardHeader>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                {
                    items.length > 1 && (
                        <>
                            <CarouselPrevious />
                            <CarouselNext />
                        </>
                    )
                }
            </Carousel>
        </div>
    }),
    notification: React.forwardRef(function NotificationComponent(props: StepComponentNotification, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            title,
            description,
            color,
            time_to_exit,
            position
        } = props

        const [width, setWidth] = React.useState(100)
        React.useEffect(() => {
            setTimeout(() => {
                setWidth(0)
            }, 100)
        }, [])

        const position_label = {
            'top-right': 'Topo Direito',
            'top-left': 'Topo Esquerdo',
            'bottom-right': 'Baixo Direito',
            'bottom-left': 'Baixo Esquerdo',
        }

        return <div ref={ref} className="relative rounded-md overflow-hidden w-full flex flex-col gap-2 text-center">
            <div className="w-full p-4 rounded-md border-[1px] border-gray-200">
                <div className="flex flex-col gap-0.5 justify-start items-start">
                    <span className="text-lg font-bold">{title}</span>
                    <span className="text-sm text-muted-foreground">{description}</span>
                </div>
                <div className="absolute bottom-0 left-0 h-2 w-full" style={{
                    transitionDuration: `${time_to_exit}s`,
                    transitionTimingFunction: 'linear',
                    transitionDelay: '0s',
                    transitionProperty: 'width',
                    width: `${width}%`,
                    backgroundColor: color,
                }}>
                </div>
                <div className="absolute top-0 right-0 text-sm text-muted-foreground p-2 bg-amber-200 rounded-md ring-1 ring-amber-300 m-1 opacity-50 text-black">
                    {position_label[position]}
                </div>
            </div>
        </div>
    }),
    weight: React.forwardRef(function WeightComponent(props: StepComponentWeight, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            weight,
            color,
            title
        } = props
        const [Weight, setWeight] = React.useState(weight)

        return <div ref={ref} className="w-full flex flex-col gap-2 text-center items-center justify-center">
            <div className="text-lg font-semibold">
                {title}
            </div>
            <div className="flex flex-row gap-2 items-center justify-center border-[1px] border-gray-200 rounded-md p-2 w-fit">
                <input type="number" className="w-[60px]" min={0} max={400} value={Weight} onChange={(e) => setWeight(Number(e.target.value))} />
                <span className="text-sm text-muted-foreground">
                    Kg
                </span>
            </div>
            <div className="w-full h-[100px] relative">
                <WeightIcon style={{
                    color: color
                }} className="w-24 h-24 absolute top-[50%] left-[50%] text-neutral-800 -translate-x-[50%] -translate-y-[50%]"/>
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] mt-3 font-semibold">
                    <AnimatedNumber value={Weight} duration={1000} />Kg
                </div>
            </div>
        </div>
    }),
    height: React.forwardRef(function HeightComponent(props: StepComponentHeight, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            height,
            color,
            title
        } = props
        const [Height, setHeight] = React.useState(height)
        // similar to weight component, but with height
        return <div ref={ref} className="w-full flex flex-col gap-2 text-center items-center justify-center">
            <div className="text-lg font-semibold">
                {title}
            </div>
            <div className="flex flex-row gap-2 items-center justify-center border-[1px] border-gray-200 rounded-md p-2 w-fit">
                <input type="number" className="height-input" min={0} max={250} value={Height} onChange={(e) => setHeight(Number(e.target.value))} />
                <span className="text-sm text-muted-foreground">
                    Cm
                </span>
            </div>
            <div className="w-full h-[100px] relative">
                <div className="absolute top-[50%] left-[70%] -translate-x-[50%] -translate-y-[50%]">
                    <Ruler style={{
                        color: color
                    }} className="w-24 h-24 rotate-[45deg] text-neutral-800 "/>
                    <div className="absolute w-2 h-2 rounded-full left-[75%] opacity-75 duration-100 ease-in-out" style={{
                        bottom: `${Math.round((Height / 250) * 100)}%`,
                        backgroundColor: color
                    }}>

                    </div>
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] mt-3 font-semibold">
                    <AnimatedNumber value={Height} duration={1000} />Cm
                </div>
            </div>
        </div>
    }),
    level: React.forwardRef(function LevelComponent(props: StepComponentLevel, ref: React.ForwardedRef<HTMLDivElement>) {
        const {
            title,
            description,
            color,
            value
        } = props
        // like the progress component
        return <div ref={ref} className="w-full flex flex-col gap-0.5 items-start justify-start">
            <div className="text-lg font-semibold">{title}</div>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="text-sm text-muted-foreground mb-2">{description}</div>
                <div className="text-sm text-muted-foreground mb-2 font-bold">{value}%</div>
            </div>
            <Progress value={value} color={color}/>
        </div>
    }),
}

const AnimatedNumber = ({ value, duration = 1000 }: { value: number, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const currentValue = Math.round(startValue + (value - startValue) * progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

interface DraggableComponentProps {
  component: StepComponent;
  index: number;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  duplicateComponent: (component: StepComponent, index: number) => void;
  handleDeleteComponent: (component: StepComponent, index: number) => void;
  setActiveEditingComponentId: (id: string) => void;
}

// Create the draggable component
const DraggableComponent = ({ 
  component, 
  index,
  moveComponent,
  duplicateComponent,
  handleDeleteComponent,
  setActiveEditingComponentId 
}: DraggableComponentProps) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'COMPONENT',
        item: { index },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'COMPONENT',
        hover: (item: { index: number }) => {
        if (item.index === index) return
        moveComponent(item.index, index)
        item.index = index
        },
    })

  const ComponentsDict = stepComponentsJSX as {
    [key in StepComponentType]: React.FC<AnyStepComponent> | React.ForwardRefExoticComponent<AnyStepComponent>
  }
  const Component = ComponentsDict[component.type]

  return (
    <div
    // @ts-expect-error This lib should work
      ref={drop}
      className={`group w-[calc(100%-6px)] h-fit p-4 m-[3px] rounded-md hover:ring-1 hover:ring-neutral-200 transition-all duration-100 ease-in-out relative ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
        <div 
            className={`z-20 flex bg-neutral-500/50 flex-row gap-1 absolute top-0 right-0 p-1 m-2 rounded-md ring-1 ring-neutral-200 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-100 ease-in-out`}
        >
            <Button 
            // @ts-expect-error This lib should work
            ref={drag}
            variant="ghost" 
            className="px-1.5 py-0 cursor-move"
            >
                <GripVertical className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="px-1.5 py-0" onClick={() => duplicateComponent(component, index)}>
                <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="px-1.5 py-0" onClick={() => setActiveEditingComponentId(component.id as string)}>
                <PencilIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="px-1.5 py-0" onClick={() => handleDeleteComponent(component, index)}>
                <Trash className="h-4 w-4" />
            </Button>
        </div>
        <div className="z-10 w-full h-full">
            <Component {...component} index={index} />
        </div>
    </div>
  )
}

type Theme = {
    name?: string
    colors: {
        text: string
        bg: string
        funil_bg: string
        primary: string
    }
    font_cdn?: string
}

const defaultThemes: Theme[] = [
    {
        name: 'Gelado',
        colors: {
            text: '#000000',
            bg: '#FFFFFF',
            funil_bg: '#F0F0F0',
            primary: '#000000'
        }
    },
    {
        name: 'Minimalista',
        colors: {
            text: '#000000',
            bg: '#FFFFFF',
            funil_bg: '#F0F0F0',
            primary: '#000000'
        },
        font_cdn: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
    },
    {
        name: 'Clássico & Chique',
        colors: {
            text: '#000000',
            bg: '#FFFFFF',
            funil_bg: '#F0F0F0',
            primary: '#000000'
        },
        font_cdn: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
    }
]

export default function BuilderPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    
    const [activeFunil, setActiveFunil] = React.useState<Funil | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [activeFunilStructure, setActiveFunilStructure] = React.useState<FunilStructure>({
        steps: [],
        funil_id: ''
    })
    const [activeStep, setActiveStep] = React.useState<string | null>(null)
    const [activeEditingComponentId, setActiveEditingComponentId] = React.useState<string | null>(null)

    const [theme, setTheme] = React.useState<Theme | null>(null)

    const router = useRouter()
    const tags: Tag[] = ['Leads', 'Outro', 'Comunidade']
    const priorities: Priority[] = ['Alta', 'Média', 'Baixa']
    const handleClickNewComponent = (component: StepComponent) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps: Step[] = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            // update the active step
            const activeStepIndex = newSteps.findIndex(step => step.id === activeStep)
            if (activeStepIndex === -1) return prevActiveFunilStructure
            newSteps[activeStepIndex].contents.push({
                ...component,
                id: uuidv4(),
            })
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
        })
    }
    const [creatingNewFunil, setCreatingNewFunil] = React.useState(false)
    useEffect(() => {
        (async () => {
            const { id } = await params
            console.log({id})
            if (id === 'novo') {
                setCreatingNewFunil(true)
            } else {
                (async () => {
                    const db = getFirestore();
                    const docRef = doc(db, 'funis-base', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const funilFromDb = docSnap.data() as Funil;
                        funilFromDb.created_at = (funilFromDb.created_at as unknown as Timestamp).toDate();
                        setActiveFunil(funilFromDb);
                    }
                    const docRefStructure = doc(db, 'funis-structure', id);
                    const docSnapStructure = await getDoc(docRefStructure);
                    if (docSnapStructure.exists()) {
                        const funilStructureFromDb = docSnapStructure.data() as FunilStructure;
                        funilStructureFromDb.steps.forEach(step => {
                            step.contents.forEach(component => {
                                if (component.type === 'timer') {
                                    // parse firebase timestamp to date
                                    (component as StepComponentTimer).date = parseDate((component as any).date)
                                }
                            })
                        })
                        setActiveFunilStructure(funilStructureFromDb);
                        setActiveStep(funilStructureFromDb.steps[0].id)
                    }
                    setLoading(false)
                })()
            }
        })()

    }, [])
    
    function download(filename: string, text: string) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    const [loadingExport, setLoadingExport] = React.useState(false)
    const exportFunil = async () => {
        if (!activeFunil) return alert('Selecione um funil para exportar')
        setLoadingExport(true)
        try {    
            // Collect all scripts from the funil structure
            const headScripts: string[] = []
            const footerScripts: string[] = []
            const inlineScripts: string[] = []

            activeFunilStructure.steps.forEach(step => {
                step.contents.forEach(component => {
                    if (component.type === 'script') {
                        const scriptComponent = component as StepComponentScript
                        if (scriptComponent.location === 'head') {
                            headScripts.push(scriptComponent.script)
                        } else if (scriptComponent.location === 'footer') {
                            footerScripts.push(scriptComponent.script)
                        } else {
                            inlineScripts.push(scriptComponent.script)
                        }
                    }
                })
            })

            const result = await fetch('/api/html_result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // @ts-expect-error Its on the window
                    apiKey: window.app.options.apiKey,
                    // @ts-expect-error Its on the window
                    authDomain: window.app.options.authDomain,
                    // @ts-expect-error Its on the window
                    projectId: window.app.options.projectId,
                    // @ts-expect-error Its on the window
                    storageBucket: window.app.options.storageBucket,
                    // @ts-expect-error Its on the window
                    messagingSenderId: window.app.options.messagingSenderId,
                    // @ts-expect-error Its on the window
                    appId: window.app.options.appId,
                    funil_id: activeFunil.id,
                    funil_name: activeFunil.name,
                    headScripts,
                    footerScripts,
                    inlineScripts
                })
            })
            const json = await result.json()
            const { html } = json
            download(`${activeFunil.name.trim().replaceAll(' ', '_')}.html`, html)
            setLoadingExport(false)
        } catch (error) {
            console.log(error)
            alert("Erro ao exportar o funil, tente novamente")
            setLoadingExport(false)
        }
    }

    const handleMoveStepUp = (step: Step, index: number) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            newSteps.splice(index - 1, 0, newSteps.splice(index, 1)[0])
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
        })
    }
    const handleMoveStepDown = (step: Step, index: number) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            newSteps.splice(index + 1, 0, newSteps.splice(index, 1)[0])
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
        })
    }
    const duplicateComponent = (component: StepComponent, index: number) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            if (ActiveStepIndex === null || ActiveStepIndex === -1) return prevActiveFunilStructure;
            newSteps[ActiveStepIndex].contents.splice(index + 1, 0, {
                ...component,
                id: Math.random().toString(36).substring(2, 15),
            })
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
        })
    }
    const handleDeleteComponent = (component: StepComponent, index: number) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps));
            if (ActiveStepIndex === null || ActiveStepIndex === -1) return prevActiveFunilStructure;
            newSteps[ActiveStepIndex].contents.splice(index, 1);
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            };
        })
    }
    const ActiveStepIndex = activeStep ? activeFunilStructure.steps.findIndex(step => step.id === activeStep) : null
    const ActiveStep = typeof ActiveStepIndex === 'number' ? activeFunilStructure.steps[ActiveStepIndex] : null
    const editingComponentIndex = activeEditingComponentId ? ActiveStep?.contents.findIndex(component => component.id === activeEditingComponentId) : null
    const editingComponent = typeof editingComponentIndex === 'number' ? ActiveStep?.contents[editingComponentIndex] : null

    const updateEditingComponent = <T extends Omit<StepComponent, 'type'> | AnyStepComponent>(new_data: T) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            // Use ActiveStepIndex to update the correct step
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps));
            if (ActiveStepIndex === null || ActiveStepIndex === -1) return prevActiveFunilStructure;
            if (editingComponentIndex === null || editingComponentIndex === -1 || editingComponentIndex === undefined) return prevActiveFunilStructure;
            
            newSteps[ActiveStepIndex].contents[editingComponentIndex] = {
                ...newSteps[ActiveStepIndex].contents[editingComponentIndex],
                ...new_data
            };
    
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            };
        });
    };
    const updateActiveStepName = (new_name: string) => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            if (ActiveStepIndex === null || ActiveStepIndex === -1) return prevActiveFunilStructure;
            newSteps[ActiveStepIndex].name = new_name
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
        })
    }
    const handleNewStep = () => {
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            newSteps.push({
                id: Math.random().toString(36).substring(2, 15),
                name: 'Etapa ' + (newSteps.length + 1),
                contents: []
            })
            return {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
        })
    }
    const [loadingSave, setLoadingSave] = React.useState(false)
    const saveFunil = async () => {
        if (!activeFunil) return;
        setLoadingSave(true)
        // we save the funil and the funil structure in firebase
        const db = getFirestore();
        try {
            const docRef = doc(db, 'funis-base', activeFunil.id);
            await setDoc(docRef, activeFunil);
    
            const docRefStructure = doc(db, 'funis-structure', activeFunil.id);
            await setDoc(docRefStructure, activeFunilStructure);
            toast({
                title: 'Funil salvo com sucesso',
                description: 'Seu funil foi salvo com sucesso',
            })
            setLoadingSave(false)
        } catch (error) {
            console.log(error)
            alert("Erro ao salvar o funil, tente novamente")
            setLoadingSave(false)
        }
    }
    const [newFunilName, setNewFunilName] = React.useState<string>("")
    const [newFunilDescription, setNewFunilDescription] = React.useState<string>("")
    const [newFunilPriority, setNewFunilPriority] = React.useState<Priority>("Alta")
    const [newFunilStatus, setNewFunilStatus] = React.useState<Status>("Ativo")
    const [newFunilTag, setNewFunilTag] = React.useState<Tag>("Leads")
    const createNewFunil = async () => {
        const uuid = uuidv4()
        setActiveFunil({
            id: uuid,
            name: newFunilName,
            description: newFunilDescription,
            priority: newFunilPriority,
            status: newFunilStatus,
            tag: newFunilTag,
            created_at: new Date(),
            n_answers: 0,
            n_access: 0,
        })
        setActiveFunilStructure({
            steps: [
                {
                    id: 'initial-step',
                    name: 'Primeiro Passo',
                    contents: []
                }
            ],
            funil_id: uuid
        })
        setCreatingNewFunil(false)
        setLoading(false)
        setActiveStep('initial-step')
    }
    
    type Tabs = 'edit' | 'results' | 'theme'
    const [tab, setTab] = React.useState<Tabs>('edit')

    const handleCopyStep = (name: string) => {
        if (ActiveStepIndex !== null && ActiveStepIndex === -1) return;
        const newStepName = name + ' (Copia)'
        // create a new step with the same contents
        const newStep = {
            id: Math.random().toString(36).substring(2, 15),
            name: newStepName,
            contents: JSON.parse(JSON.stringify(activeFunilStructure.steps[ActiveStepIndex as number].contents)),
        }
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            newSteps.push(newStep)
            const newFunilStructure = {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
            return newFunilStructure
        })
    }
    const handleDeleteStep = () => {
        if (ActiveStepIndex !== null && ActiveStepIndex === -1) return;
        setActiveFunilStructure(prevActiveFunilStructure => {
            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
            newSteps.splice(ActiveStepIndex as number, 1)
            setActiveStep(newSteps[0].id)
            const newFunilStructure = {
                ...prevActiveFunilStructure,
                steps: newSteps
            }
            return newFunilStructure
        })
        
    }
    if (creatingNewFunil) {
        return <div className="w-full flex items-center justify-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Crie um novo funil</CardTitle>
                    <CardDescription>Lembre-se, foque em como deixar o seu funil atrativo e relevante para seus usuários.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Nome</Label>
                                <Input value={newFunilName} id="name" placeholder="Nome do seu funil" onChange={(event) => setNewFunilName(event.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea id="description" placeholder="Descrição do seu funil" value={newFunilDescription} onChange={(event) => setNewFunilDescription(event.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="tag">Tag</Label>
                                <Select value={newFunilTag} onValueChange={(value) => setNewFunilTag(value as Tag)}>
                                    <SelectTrigger id="tag">
                                        <SelectValue placeholder="Selecione uma tag" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {
                                            tags.map(tag => {
                                                return <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="priority">Prioridade</Label>
                                <Select value={newFunilPriority} onValueChange={(value) => setNewFunilPriority(value as Priority)}>
                                    <SelectTrigger id="priority">
                                        <SelectValue placeholder="Selecione uma prioridade" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {
                                            priorities.map(priority => {
                                                return <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="flex items-center gap-2" variant="outline" onClick={() => router.push('/system/lista-funis')}>
                        <MoveLeftIcon className="h-4 w-4" /> Cancelar
                    </Button>
                    <Button className="flex items-center gap-2" onClick={createNewFunil}>
                        <Plus className="h-4 w-4" />
                        Criar funil
                    </Button>
                </CardFooter>
            </Card>
        </div>
    }
    if (loading) {
        return <div className="w-full flex items-center justify-center">
            Carregando...
        </div>
    }
    if (!activeFunil) {
        return null
    }
    return <Tabs value={tab} onValueChange={e => setTab(e as Tabs)} className="p-4 min-h-[calc(100vh-160px)] rounded-md border border-neutral-200 flex flex-col relative">
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => router.push('/system/lista-funis')}>
                    <MoveLeft className="h-4 w-4" />
                    Voltar
                </Button>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link">{activeFunil?.name || 'Funil sem nome'}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{activeFunil?.name || 'Funil sem nome'}</h4>
                            <p className="text-sm">
                            {activeFunil?.description || 'Descrição do funil sem descrição'}
                            </p>
                            <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Criado em {activeFunil?.created_at?.toLocaleDateString() || 'Data desconhecida'}
                            </span>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger className="flex gap-2" value="edit"><Pencil className="h-4 w-4" />Editar</TabsTrigger>
                    <TabsTrigger className="flex gap-2" value="results"><ChartPie className="h-4 w-4" />Resultados</TabsTrigger>
                    <TabsTrigger disabled className="flex gap-2" value="theme"><Palette className="h-4 w-4" />Tema</TabsTrigger>
                    <TabsTrigger disabled className="flex gap-2" value="settings"><Wrench className="h-4 w-4" />Configurações</TabsTrigger>
                </TabsList>
            </div>
            <div className="flex flex-row gap-2">
                <Button disabled variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button disabled variant="outline" size="sm" className="flex items-center gap-2">
                    Ver funil
                    <Eye className="h-4 w-4" />
                </Button>
                <Button disabled={loadingSave} onClick={saveFunil} size="sm" className="flex items-center gap-2">
                    {loadingSave ? 'Salvando...' : 'Salvar'}
                    <Save className="h-4 w-4" />
                </Button>
                <Button disabled={loadingExport} onClick={exportFunil} size="sm" className="flex items-center gap-2">
                    {loadingExport ? 'Exportando...' : 'Exportar HTML'}
                    <Expand className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <div className="w-full h-full flex-1 flex flex-col justify-center">
            {
                tab === 'edit' && (
                <TabsContent className="bg-slate-100 p-2 rounded-sm flex flex-row gap-2" style={{ height: 'calc(100vh - 48px - 40px - 160px)' }} value="edit">
                    <>
                        <div className="w-[15%] flex flex-col p-4 rounded-sm shadow-md bg-white h-full">
                            <div className="flex flex-row gap-2 items-center mb-2">
                                <Route className="h-4 w-4" />
                                <span className="text-md font-semibold">Etapas</span>
                            </div>
                            <Separator className="mb-2"/>
                            <div className="w-full h-full flex flex-col gap-2">
                                <DndProvider backend={HTML5Backend}>
                                    {
                                        activeFunilStructure.steps.map((step, index) => {
                                            return <DraggableStep
                                                key={step.id}
                                                step={step}
                                                index={index} 
                                                moveStep={(dragIndex: number, hoverIndex: number) => {
                                                    setActiveFunilStructure(prevActiveFunilStructure => {
                                                        const newSteps = [...prevActiveFunilStructure.steps]
                                                        const dragStep = newSteps[dragIndex]
                                                        newSteps.splice(dragIndex, 1)
                                                        newSteps.splice(hoverIndex, 0, dragStep)
                                                        return {
                                                            ...prevActiveFunilStructure,
                                                            steps: newSteps
                                                        }
                                                    })
                                                }}
                                                setActiveStep={setActiveStep}
                                                ActiveStepIndex={ActiveStepIndex || 0}
                                                stepsLength={activeFunilStructure.steps.length}
                                                handleMoveStepUp={handleMoveStepUp}
                                                handleMoveStepDown={handleMoveStepDown}
                                            />
                                        })
                                    }
                                </DndProvider>
                                {
                                    activeFunilStructure.steps.length > 0 && (
                                        <Separator className="my-2"/>
                                    )
                                }
                                <Button onClick={handleNewStep} className="w-full">
                                    Adicionar etapa
                                </Button>
                            </div>
                        </div>
                        <div className="w-[25%] flex flex-col p-4 rounded-sm shadow-md bg-white h-full">
                            <div className="flex flex-row gap-2 items-center mb-2">
                                <Box className="h-4 w-4" />
                                <span className="text-md font-semibold">Componentes</span>
                            </div>
                            <Separator  className="mb-2"/>
                            <div className="flex flex-row flex-wrap items-start overflow-auto">
                                {
                                    Object.entries(stepComponents).map(([key, component]) => {
                                        const Icon = stepComponentsIcons[key as StepComponentType]
                                        const name = stepComponentsNames[key as StepComponentType]
                                        const active = true
                                        return <div className={"w-1/2 p-2 h-32 "+ (!active ? "opacity-50 pointer-events-none" : "")} key={key}>
                                            <div onClick={() => handleClickNewComponent(component)} className="component-add-block flex flex-col items-center justify-center gap-2 h-full rounded-sm shadow-sm bg-white ring-1 ring-neutral-200 hover:bg-slate-50 cursor-pointer hover:shadow-md transition-all transition-100 hover:rounded-lg">
                                                <Icon className="h-4 w-4" />
                                                <span className="text-md font-semibold w-full text-center break-before-auto whitespace-break-spaces px-2">{name}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-[35%] flex flex-col p-4 rounded-sm shadow-md bg-white h-full">
                            <div className="flex flex-row gap-2 items-center justify-center mb-2">
                                <span className="text-md font-semibold flex flex-row gap-1 justify-between w-full">
                                    <span className="flex flex-row gap-1 items-center w-[30%]">
                                        <Filter className="h-4 w-4" />
                                        Etapa {(ActiveStepIndex || 0) + 1}.
                                    </span> 
                                    <div className="flex flex-row gap-1 items-center w-full">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button disabled={activeFunilStructure.steps.length <= 1} variant="ghost" className="px-1.5 py-0">
                                                    <Trash className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                <div className="flex flex-col gap-2">
                                                    <h4 className="text-sm font-semibold">Deletar etapa</h4>
                                                    <p className="text-sm font-medium">
                                                        Deletar a etapa atual. Essa ação não pode ser desfeita.
                                                    </p>
                                                    <Button className="w-full font-semibold" disabled={activeFunilStructure.steps.length <= 1} variant="destructive" onClick={() => handleDeleteStep()}>
                                                        Sim, deletar
                                                    </Button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button variant="ghost" className="px-1.5 py-0" onClick={() => handleCopyStep(ActiveStep!.name)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">Copiar etapa</h4>
                                                    <p className="text-sm font-medium">
                                                        Criar uma etapa com o mesmo conteúdo da etapa atual.
                                                    </p>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                        <Input value={ActiveStep?.name} onChange={(event) => updateActiveStepName(event.target.value)} className="w-full" />
                                    </div>
                                </span>
                            </div>
                            <Separator  className="mb-2"/>
                            <div id="funil-structure-steps" className="flex flex-col gap-2 items-start overflow-auto">
                                <DndProvider backend={HTML5Backend}>
                                    {
                                        ActiveStep?.contents.map((component, index) => (
                                                <DraggableComponent
                                                    key={component.id + '_' + index}
                                                    component={component}
                                                    index={index}
                                                    moveComponent={(dragIndex, hoverIndex) => {
                                                        setActiveFunilStructure(prevActiveFunilStructure => {
                                                            const newSteps = JSON.parse(JSON.stringify(prevActiveFunilStructure.steps))
                                                            if (ActiveStepIndex === null || ActiveStepIndex === -1) return prevActiveFunilStructure
                                                            const dragComponent = newSteps[ActiveStepIndex].contents[dragIndex]
                                                            newSteps[ActiveStepIndex].contents.splice(dragIndex, 1)
                                                            newSteps[ActiveStepIndex].contents.splice(hoverIndex, 0, dragComponent)
                                                            return {
                                                                ...prevActiveFunilStructure,
                                                                steps: newSteps
                                                            }
                                                        })
                                                    }}
                                                    duplicateComponent={duplicateComponent}
                                                    handleDeleteComponent={handleDeleteComponent}
                                                    setActiveEditingComponentId={setActiveEditingComponentId}
                                                />
                                        ))
                                    }
                                </DndProvider>
                            </div>
                        </div>
                        <div className="w-[30%] flex flex-col p-4 rounded-sm shadow-md bg-white h-full">
                            <div className="flex flex-row gap-2 items-center mb-2">
                                <Pencil className="h-4 w-4" />
                                <span className="text-md font-semibold">Edição de componente</span>
                            </div>
                            <Separator className="mb-2"/>
                            <div className="flex flex-col gap-2 items-start overflow-auto">
                                {
                                    !(activeEditingComponentId && editingComponent) && (
                                        <div className="w-full flex flex-col gap-4 text-center items-center justify-center pt-20">
                                            <MousePointer className="h-16 w-16 opacity-85" />
                                            <span className="text-md text-muted-foreground">Clique em um componente para editar</span>
                                        </div>
                                    )
                                }
                                {
                                    activeEditingComponentId && editingComponent && (
                                        <div className="w-full p-2">
                                            <div className="flex flex-col gap-2 items-center justify-between">
                                            {
                                                    editingComponent.type === 'text' && (() => {
                                                        const component = editingComponent as StepComponentText
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="headline">Texto</Label>
                                                                <Editor value={component.headline} onChange={(event) => updateEditingComponent({ headline: event.target.value } as StepComponentText)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <div className="flex flex-row gap-2">
                                                                    <ColorPicker value={component.color} id="color" onChange={(color) => updateEditingComponent({ color } as StepComponentText)} />
                                                                    <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ color: '#000000' } as StepComponentText)}>
                                                                        <RotateCcw className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'image' && (() => {
                                                        const component = editingComponent as StepComponentImage
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="url">URL</Label>
                                                                <Input value={component.src} id="url" placeholder="URL da imagem" onChange={(event) => updateEditingComponent({ src: event.target.value } as StepComponentImage)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="description">Descrição da imagem</Label>
                                                                <Input value={component.alt} id="alt" placeholder="Descrição da imagem" onChange={(event) => updateEditingComponent({ alt: event.target.value } as StepComponentImage)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'timer' && (() => {
                                                        const component = editingComponent as StepComponentTimer
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="headline">Título</Label>
                                                                <Input value={component.headline} id="headline" placeholder="Título do timer" onChange={(event) => updateEditingComponent({ headline: event.target.value } as StepComponentTimer)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="description">Descrição</Label>
                                                                <Input value={component.description} id="description" placeholder="Descrição do timer" onChange={(event) => updateEditingComponent({ description: event.target.value } as StepComponentTimer)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="end_description">Texto final</Label>
                                                                <Input value={component.end_description} id="end_description" placeholder="Texto final do timer" onChange={(event) => updateEditingComponent({ end_description: event.target.value } as StepComponentTimer)} />
                                                            </div>
                                                            <RadioGroup className="pt-1" value={component.use} onValueChange={(value) => {
                                                                updateEditingComponent({ use: value } as StepComponentTimer)
                                                            }}>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="duration" id="duration" />
                                                                    <Label htmlFor="duration">Timer por duração</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="date" id="date" />
                                                                    <Label htmlFor="date">Timer por data</Label>
                                                                </div>
                                                            </RadioGroup>
                                                            {
                                                                component.use === 'duration' && (
                                                                    <div className="grid w-full items-center gap-1.5">
                                                                        <Label htmlFor="duration">Duração</Label>
                                                                        <Input value={component.duration} type="number" id="duration" placeholder="Duração do timer" onChange={(event) => updateEditingComponent({ duration: parseInt(event.target.value) } as StepComponentTimer)} />
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                component.use === 'date' && (
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[240px] justify-start text-left font-normal",
                                                                                !component.date && "text-muted-foreground"
                                                                            )}
                                                                            >
                                                                            <CalendarIcon />
                                                                            {component.date ? safeFormatDate(component.date) : <span>Escolha uma data</span>}
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-auto p-0" align="start">
                                                                            <Calendar
                                                                            mode="single"
                                                                            selected={parseDate(component.date || new Date())}
                                                                            onSelect={(date) => {
                                                                                console.log(date, date instanceof Date)
                                                                                updateEditingComponent({ date } as StepComponentTimer)
                                                                            }}
                                                                            initialFocus
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                )
                                                            }
                                                            {
                                                                // colors
                                                            }
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor do texto</Label>
                                                                <div className="flex flex-row gap-2">
                                                                    <ColorPicker value={component.text_color || '#000000'} id="color" onChange={(color) => updateEditingComponent({ text_color: color } as StepComponentTimer)} />
                                                                    <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ text_color: '#000000' } as StepComponentTimer)}>
                                                                        <RotateCcw className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor de fundo</Label>
                                                                <div className="flex flex-row gap-2">
                                                                    <ColorPicker value={component.bg_color || '#ffffff'} id="color" onChange={(color) => updateEditingComponent({ bg_color: color } as StepComponentTimer)} />
                                                                    <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ bg_color: '#ffffff' } as StepComponentTimer)}>
                                                                        <RotateCcw className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'spacer' && (() => {
                                                        const component = editingComponent as StepComponentSpacer
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="headline">Altura</Label>
                                                                <Input value={component.height} type="number" id="height" placeholder="Altura do espaço" onChange={(event) => updateEditingComponent({ height: parseInt(event.target.value) } as StepComponentSpacer)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'benefits' && (() => {
                                                        const component = editingComponent as StepComponentBenefits
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="headline">Título</Label>
                                                                <Input value={component.headline} id="headline" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ headline: event.target.value } as StepComponentBenefits)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="description">Descrição</Label>
                                                                <Input value={component.description} id="description" placeholder="Descrição do componente" onChange={(event) => updateEditingComponent({ description: event.target.value } as StepComponentBenefits)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="comparisons">Comparações</Label>
                                                                <Input value={component.comparisons.join(', ')} id="comparisons" placeholder="Comparações do componente" onChange={(event) => updateEditingComponent({ comparisons: event.target.value.split(', ') } as StepComponentBenefits)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="benefits">Benefícios</Label>
                                                                <div className="flex flex-col gap-2">
                                                                    {
                                                                        Object.entries(component.benefits).map(([benefitId, benefit]) => {
                                                                            return <div key={benefitId} className="flex flex-col gap-1">
                                                                                <div className="flex flex-row gap-2">
                                                                                    <Input value={benefit.title} id="benefit-title" placeholder="Título do benefício" onChange={(event) => updateEditingComponent({ benefits: {
                                                                                        ...component.benefits,
                                                                                        [benefitId]: {
                                                                                            ...benefit,
                                                                                            title: event.target.value,
                                                                                        }
                                                                                    }} as StepComponentBenefits)} />
                                                                                    <Button className="px-3" variant="ghost" onClick={() => {
                                                                                        const newBenefits = JSON.parse(JSON.stringify(component.benefits))
                                                                                        delete newBenefits[benefitId]
                                                                                        updateEditingComponent({ benefits: newBenefits } as StepComponentBenefits)
                                                                                    }}>
                                                                                        <Trash className="h-4 w-4 text-destructive" />
                                                                                    </Button>
                                                                                    <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ benefits: {
                                                                                        ...component.benefits,
                                                                                        [benefitId]: {
                                                                                            ...benefit,
                                                                                            title: '',
                                                                                        }
                                                                                    }} as StepComponentBenefits)}>
                                                                                        <RotateCcw className="h-4 w-4" />
                                                                                    </Button>                                                                                </div>
                                                                                <div className="flex flex-row gap-2">
                                                                                    <Input value={benefit.comparisons.join(', ')} id="benefit-comparisons" placeholder="Comparações do benefício" onChange={(event) => updateEditingComponent({ benefits: {
                                                                                        ...component.benefits,
                                                                                        [benefitId]: {
                                                                                            ...benefit,
                                                                                            comparisons: event.target.value.split(', '),
                                                                                        }
                                                                                    }} as StepComponentBenefits)} />
                                                                                    <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ benefits: {
                                                                                        ...component.benefits,
                                                                                        [benefitId]: {
                                                                                            ...benefit,
                                                                                            comparisons: [],
                                                                                        }
                                                                                    }} as StepComponentBenefits)}>
                                                                                        <RotateCcw className="h-4 w-4" />
                                                                                    </Button>
                                                                                </div>
                                                                                <Separator />
                                                                            </div>
                                                                        })
                                                                    }
                                                                    <Button className="w-full" onClick={() => updateEditingComponent({ benefits: {
                                                                        ...component.benefits,
                                                                        [Math.random().toString(36).substring(2, 15)]: {
                                                                            title: 'Benefício ' + (Object.keys(component.benefits).length + 1),
                                                                            comparisons: [],
                                                                        }
                                                                    }} as StepComponentBenefits)}>
                                                                        Adicionar benefício
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'button' && (() => {
                                                        const component = editingComponent as StepComponentButton
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="headline">Título</Label>
                                                                <Input value={component.label} id="label" placeholder="Título do botão" onChange={(event) => updateEditingComponent({ label: event.target.value } as StepComponentButton)} />
                                                            </div>
                                                            {
                                                                // radio for destiny
                                                            }
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="destiny">Destino</Label>
                                                                <RadioGroup value={component.destiny} onValueChange={(value) => {
                                                                    updateEditingComponent({ destiny: value } as StepComponentButton)
                                                                }}>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="next" id="next" />
                                                                        <Label htmlFor="next">Próximo passo</Label>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="url" id="url" />
                                                                        <Label htmlFor="url">URL</Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                            {
                                                                component.destiny === 'url' && (
                                                                    <div className="grid w-full items-center gap-1.5">
                                                                        <Label htmlFor="destiny_url">URL</Label>
                                                                        <Input value={component.destiny_url} id="destiny_url" placeholder="URL do destino" onChange={(event) => updateEditingComponent({ destiny_url: event.target.value } as StepComponentButton)} />
                                                                    </div>
                                                                )
                                                            }
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="facebook_event">Facebook evento ao clicar</Label>
                                                                <Input value={component.facebook_event} id="facebook_event" placeholder={`"fbq('track', 'Lead');" ou 'Lead'`} onChange={(event) => updateEditingComponent({ facebook_event: event.target.value } as StepComponentButton)} />
                                                                <Label><b>Importante:</b> Lembre-se de adicionar seu pixel do Facebook no funil caso queira usar os eventos!</Label>
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="delay">Atraso (segundos)</Label>
                                                                <Input value={component.delay} type="number" id="delay" placeholder="Atraso do botão" onChange={(event) => updateEditingComponent({ delay: parseInt(event.target.value) } as StepComponentButton)} />
                                                            </div>
                                                            {
                                                                // colors
                                                            }
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <div className="flex flex-row gap-2">
                                                                    <ColorPicker value={component.color || '#000000'} id="color" onChange={(color) => updateEditingComponent({ color } as StepComponentButton)} />
                                                                    <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ color: '#000000' } as StepComponentButton)}>
                                                                        <RotateCcw className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            {
                                                                // checkbox for is_end
                                                            }
                                                            <div className="w-full flex flex-row gap-2">
                                                                <Checkbox checked={component.is_end} id="is_end" onCheckedChange={(val) => updateEditingComponent({ is_end: val } as StepComponentButton)} />
                                                                <Label htmlFor="is_end">Ativar fim do quiz ao clicar</Label>
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'progress' && (() => {
                                                        const component = editingComponent as StepComponentProgress
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="headline">Título</Label>
                                                                <Input value={component.title} id="title" placeholder="Título do progresso" onChange={(event) => updateEditingComponent({ title: event.target.value } as StepComponentProgress)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="final_progress">Progresso final</Label>
                                                                <Input value={component.final_progress} type="number" id="final_progress" placeholder="Progresso final do progresso" onChange={(event) => updateEditingComponent({ final_progress: parseInt(event.target.value) } as StepComponentProgress)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="duration">Duração</Label>
                                                                <Input value={component.duration} type="number" id="duration" placeholder="Duração do progresso" onChange={(event) => updateEditingComponent({ duration: parseInt(event.target.value) } as StepComponentProgress)} />
                                                            </div>
                                                            {
                                                                // destiny
                                                            }
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="destiny">Destino</Label>
                                                                <RadioGroup value={component.destiny || "next"} onValueChange={(value) => {
                                                                    updateEditingComponent({ destiny: value } as StepComponentProgress)
                                                                }}>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="next" id="next" />
                                                                        <Label htmlFor="next">Próximo passo</Label>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="url" id="url" />
                                                                        <Label htmlFor="url">URL</Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                            {
                                                                component.destiny === 'url' && (
                                                                    <div className="grid w-full items-center gap-1.5">
                                                                        <Label htmlFor="destiny_url">URL</Label>
                                                                        <Input value={component.destiny_url} id="destiny_url" placeholder="URL do destino" onChange={(event) => updateEditingComponent({ destiny_url: event.target.value } as StepComponentProgress)} />
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'feedback' && (() => {
                                                        const component = editingComponent as StepComponentFeedback
                                                        return <>
                                                            <div className="w-full flex flex-row justify-start items-center space-x-2">
                                                                <Checkbox checked={component.carousel} id="carousel" onCheckedChange={(val) => updateEditingComponent({ carousel: val } as StepComponentFeedback)} />
                                                                <Label htmlFor="carousel">Carrossel</Label>
                                                            </div>
                                                            <Button className="w-full" onClick={() => updateEditingComponent({ feedbacks: [...component.feedbacks, { id: Math.random().toString(36).substring(2, 15), title: 'Feedback Novo', social: 'facebook', description: 'Descrição do feedback', stars: 5 }] } as StepComponentFeedback)}>
                                                                Adicionar feedback
                                                            </Button>
                                                            <Separator className="w-full" />
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    component.feedbacks.map((feedback, index) => {
                                                                        return <AccordionItem key={feedback.id} value={feedback.id}>
                                                                            <AccordionTrigger>
                                                                                {feedback.title}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <div className="flex flex-row gap-2">
                                                                                        <div className="flex flex-row gap-2">
                                                                                            <StarIcon fill={feedback.stars >= 1 ? 'currentColor' : 'none'} onClick={() => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, stars: 1 }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} className={"h-4 w-4 cursor-pointer "+ (feedback.stars >= 1 ? "text-yellow-300" : "text-gray-300")} />
                                                                                            <StarIcon fill={feedback.stars >= 2 ? 'currentColor' : 'none'} onClick={() => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, stars: 2 }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} className={"h-4 w-4 cursor-pointer "+ (feedback.stars >= 2 ? "text-yellow-300" : "text-gray-300")} />
                                                                                            <StarIcon fill={feedback.stars >= 3 ? 'currentColor' : 'none'} onClick={() => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, stars: 3 }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} className={"h-4 w-4 cursor-pointer "+ (feedback.stars >= 3 ? "text-yellow-300" : "text-gray-300")} />
                                                                                            <StarIcon fill={feedback.stars >= 4 ? 'currentColor' : 'none'} onClick={() => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, stars: 4 }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} className={"h-4 w-4 cursor-pointer "+ (feedback.stars >= 4 ? "text-yellow-300" : "text-gray-300")} />
                                                                                            <StarIcon fill={feedback.stars >= 5 ? 'currentColor' : 'none'} onClick={() => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, stars: 5 }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} className={"h-4 w-4 cursor-pointer "+ (feedback.stars >= 5 ? "text-yellow-300" : "text-gray-300")} />
                                                                                        </div>
                                                                                        <span className="text-sm text-muted-foreground">
                                                                                            {feedback.stars} estrelas
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-2 px-1">
                                                                                        <div>
                                                                                            <Label htmlFor="title">Título</Label>
                                                                                            <Input value={feedback.title} id="title" placeholder="Título do feedback" onChange={(event) => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, title: event.target.value }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} />
                                                                                        </div>
                                                                                        <div>
                                                                                            <Label htmlFor="avatar_src">Avatar</Label>
                                                                                            <Input value={feedback.avatar_src} id="avatar_src" placeholder="URL do avatar" onChange={(event) => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, avatar_src: event.target.value }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} />
                                                                                        </div>
                                                                                        <div>
                                                                                            <Label htmlFor="social">Social</Label>
                                                                                            <Input value={feedback.social} id="social" placeholder="Social do feedback" onChange={(event) => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, social: event.target.value }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} />
                                                                                        </div>
                                                                                        <div>
                                                                                            <Label htmlFor="description">Descrição</Label>
                                                                                            <Textarea value={feedback.description} id="description" placeholder="Descrição do feedback" onChange={(event) => updateEditingComponent({ feedbacks: [...component.feedbacks.slice(0, index), { ...feedback, description: event.target.value }, ...component.feedbacks.slice(index + 1)] } as StepComponentFeedback)} />
                                                                                        </div>
                                                                                    </div>
                                                                                    {
                                                                                        // delete item
                                                                                    }
                                                                                    <Button className="w-full" variant="destructive" onClick={() => updateEditingComponent({ feedbacks: component.feedbacks.filter((_, i) => i !== index) } as StepComponentFeedback)}>
                                                                                        Remover feedback
                                                                                    </Button>
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                            </Accordion>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'price' && (() => {
                                                        const component = editingComponent as StepComponentPrice
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="text_highlight">Texto de recomendação</Label>
                                                                <Input value={component.text_highlight} id="text_highlight" placeholder="Texto de recomendação" onChange={(event) => updateEditingComponent({ text_highlight: event.target.value } as StepComponentPrice)} />
                                                            </div>
                                                            <Separator className="w-full" />
                                                            <Accordion type="single" collapsible className="w-full">
                                                            {
                                                                // plans
                                                                component.plans.map((plan, plan_index) => {
                                                                    return <AccordionItem key={plan.id} value={plan.id}>
                                                                        <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                            {plan.title}
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                            <div key={plan.id} className="grid w-full items-center gap-1.5">
                                                                                <div className="flex flex-col space-y-1.5">
                                                                                    <Label htmlFor="title">Título</Label>
                                                                                    <Input value={plan.title} id="title" placeholder="Título do plano" onChange={(event) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                        if (plan_index === index) {
                                                                                            return {
                                                                                                ...plan,
                                                                                                title: event.target.value
                                                                                            }
                                                                                        } else {
                                                                                            return plan
                                                                                        }
                                                                                    }) } as StepComponentPrice)} />
                                                                                    <Label htmlFor="description">Descrição</Label>
                                                                                    <Textarea value={plan.description} id="description" placeholder="Descrição do plano" onChange={(event) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                        if (plan_index === index) {
                                                                                            return {
                                                                                                ...plan,
                                                                                                description: event.target.value
                                                                                            }
                                                                                        } else {
                                                                                            return plan
                                                                                        }
                                                                                    }) } as StepComponentPrice)} />
                                                                                    <Label htmlFor="price">Preço</Label>
                                                                                    <Input value={plan.price} type="number" id="price" placeholder="Preço do plano" onChange={(event) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                        if (plan_index === index) {
                                                                                            return {
                                                                                                ...plan,
                                                                                                price: parseInt(event.target.value)
                                                                                            }
                                                                                        } else {
                                                                                            return plan
                                                                                        }
                                                                                    }) } as StepComponentPrice)} />
                                                                                    <Label htmlFor="descount">Desconto</Label>
                                                                                    <Input value={plan.descount} type="number" id="descount" placeholder="Desconto do plano" onChange={(event) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                        if (plan_index === index) {
                                                                                            return {
                                                                                                ...plan,
                                                                                                descount: parseInt(event.target.value)
                                                                                            }
                                                                                        } else {
                                                                                            return plan
                                                                                        }
                                                                                    }) } as StepComponentPrice)} />
                                                                                    <Label htmlFor="currency">Moeda</Label>
                                                                                    <Input value={plan.currency} id="currency" placeholder="Moeda do plano" onChange={(event) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                        if (plan_index === index) {
                                                                                            return {
                                                                                                ...plan,
                                                                                                currency: event.target.value
                                                                                            }
                                                                                        } else {
                                                                                            return plan
                                                                                        }
                                                                                    }) } as StepComponentPrice)} />
                                                                                    <div className="flex flex-row gap-2 my-2">
                                                                                        <Checkbox checked={plan.highlight} id="highlight" onCheckedChange={(val) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                            if (plan_index === index) {
                                                                                                return {
                                                                                                    ...plan,
                                                                                                    highlight: val
                                                                                                }
                                                                                            } else {
                                                                                                return {
                                                                                                    ...plan,
                                                                                                    highlight: false
                                                                                                }
                                                                                            }
                                                                                        }) } as StepComponentPrice)} />
                                                                                        <Label htmlFor="highlight">Destaque</Label>
                                                                                    </div>
                                                                                    {
                                                                                        // url, text input
                                                                                    }
                                                                                    <Label htmlFor="url">URL</Label>
                                                                                    <Input value={plan.url} id="url" placeholder="URL do plano" onChange={(event) => updateEditingComponent({ plans: component.plans.map((plan, index) => {
                                                                                        if (plan_index === index) {
                                                                                            return {
                                                                                                ...plan,
                                                                                                url: event.target.value
                                                                                            }
                                                                                        } else {
                                                                                            return plan
                                                                                        }
                                                                                    }) } as StepComponentPrice)} />
                                                                                    <Button variant={'destructive'} className="w-full" onClick={() => updateEditingComponent({ plans: component.plans.filter((plan, index) => index !== plan_index) } as StepComponentPrice)}>
                                                                                        Remover plano
                                                                                        <Trash className="h-4 w-4" />
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                })
                                                            }
                                                            </Accordion>
                                                            <Button className="w-full" onClick={() => updateEditingComponent({ plans: [...component.plans, { id: Math.random().toString(36).substring(2, 15), title: 'Plano ' + (Object.keys(component.plans).length + 1), description: 'Descrição do plano', price: 0, descount: 0, currency: 'R$', highlight: false, url: '' }] } as StepComponentPrice)}>
                                                                Adicionar plano
                                                            </Button>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'video' && (() => {
                                                        const component = editingComponent as StepComponentVideo
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="url">URL {'(deve terminar em .mp4)'}</Label>
                                                                <Input value={component.url} id="url" placeholder="URL do vídeo" onChange={(event) => updateEditingComponent({ url: event.target.value } as StepComponentVideo)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="iframe">{'<iframe> tag'}</Label>
                                                                <Textarea value={component.iframe} id="iframe" placeholder="iframe do vídeo" onChange={(event) => updateEditingComponent({ iframe: event.target.value } as StepComponentVideo)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'audio' && (() => {
                                                        const component = editingComponent as StepComponentAudio
                                                        return <>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="src">URL {'(deve terminar em .mp3)'}</Label>
                                                                <Input value={component.src} id="src" placeholder="URL do áudio" onChange={(event) => updateEditingComponent({ src: event.target.value } as StepComponentAudio)} />
                                                            </div>
                                                            <div className="grid w-full items-center gap-1.5">
                                                                <Label htmlFor="avatar">Avatar</Label>
                                                                <Input value={component.avatar} id="avatar" placeholder="URL do avatar" onChange={(event) => updateEditingComponent({ avatar: event.target.value } as StepComponentAudio)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'chart' && (() => {
                                                        const component = editingComponent as StepComponentChartLine
                                                        return <>
                                                            {
                                                                // data accordion
                                                            }
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    Object.entries(component.data).map(([key, data], index) => {
                                                                        return <AccordionItem key={key} value={key}>
                                                                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                                {key} - {data.name}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <div className="flex flex-row gap-2">
                                                                                        <div className="flex flex-col gap-2">
                                                                                            <Label htmlFor="name">Nome</Label>
                                                                                            <Input value={data.name} id="name" placeholder="Nome do dado" onChange={(event) => updateEditingComponent({ data:  
                                                                                                component.data.map((original_data, original_index) => {
                                                                                                    if (original_index === index) {
                                                                                                        return {
                                                                                                            ...original_data,
                                                                                                            name: event.target.value
                                                                                                        }
                                                                                                    } else {
                                                                                                        return original_data
                                                                                                    }
                                                                                                }) as StepComponentChartLine['data']
                                                                                            } as StepComponentChartLine)} />
                                                                                            <Label htmlFor="value">Valor</Label>
                                                                                            <Input value={data.value} type="number" id="value" placeholder="Valor do dado" onChange={(event) => updateEditingComponent({ data: 
                                                                                                component.data.map((original_data, original_index) => {
                                                                                                    if (original_index === index) {
                                                                                                        return {
                                                                                                            ...original_data,
                                                                                                            value: parseInt(event.target.value)
                                                                                                        }
                                                                                                    } else {
                                                                                                        return original_data
                                                                                                    }
                                                                                                })
                                                                                            } as StepComponentChartLine)} />
                                                                                            <Button className="w-full" onClick={() => updateEditingComponent({ data: 
                                                                                                component.data.filter((original_data, original_index) => {
                                                                                                    return original_index !== index
                                                                                                })
                                                                                            } as StepComponentChartLine)}>
                                                                                                Remover dado
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                                <Button className="w-full" onClick={() => updateEditingComponent({ data: [
                                                                    ...component.data,
                                                                    {
                                                                        name: 'Nome do dado',
                                                                        value: 0,
                                                                    }
                                                                ] as StepComponentChartLine['data']} as StepComponentChartLine)}>
                                                                    Adicionar dado
                                                                </Button>
                                                                {
                                                                    // color picker
                                                                }
                                                                <div className="w-full flex flex-row justify-start items-center space-x-2 my-4">
                                                                    <Label htmlFor="color">Cor</Label>
                                                                    <div className="flex flex-row gap-2">
                                                                        <ColorPicker value={component.color || '#000000'} id="color" onChange={(color) => updateEditingComponent({ color } as StepComponentChartLine)} />
                                                                        <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ color: '#000000' } as StepComponentChartLine)}>
                                                                            <RotateCcw className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Accordion>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'chart_circles' && (() => {
                                                        const component = editingComponent as StepComponentChartCircles
                                                        return <>
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    Object.entries(component.data).map(([key, data], index) => {
                                                                        return <AccordionItem key={key} value={key}>
                                                                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                                {key} - {data.description}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <Label htmlFor="description">Descrição</Label>
                                                                                    <Input value={data.description} id="description" placeholder="Descrição do progresso" onChange={(event) => updateEditingComponent({ data: 
                                                                                        component.data.map((original_data, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_data,
                                                                                                    description: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_data
                                                                                            }
                                                                                        }) as StepComponentChartCircles['data']
                                                                                    } as StepComponentChartCircles)} />
                                                                                        <Label htmlFor="value">Valor</Label>
                                                                                        <Input value={data.value} type="number" id="value" placeholder="Valor do progresso" onChange={(event) => updateEditingComponent({ data: 
                                                                                        component.data.map((original_data, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_data,
                                                                                                    value: parseInt(event.target.value)
                                                                                                }
                                                                                            } else {
                                                                                                return original_data
                                                                                            }
                                                                                        })
                                                                                    } as StepComponentChartCircles)} />
                                                                                    <Label htmlFor="time">Tempo</Label>
                                                                                    <Input value={data.time} type="number" id="time" placeholder="Tempo do progresso" onChange={(event) => updateEditingComponent({ data: 
                                                                                        component.data.map((original_data, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_data,
                                                                                                    time: parseInt(event.target.value)
                                                                                                }
                                                                                            } else {
                                                                                                return original_data
                                                                                            }
                                                                                        })
                                                                                    } as StepComponentChartCircles)} />
                                                                                    {
                                                                                        // color picker
                                                                                    }
                                                                                    <div className="w-full flex flex-row justify-start items-center space-x-2 my-4">
                                                                                        <Label htmlFor="color">Cor</Label>
                                                                                        <div className="flex flex-row gap-2">
                                                                                            <ColorPicker value={data.color || '#000000'} id="color" onChange={(color) => updateEditingComponent({ data: 
                                                                                                component.data.map((original_data, original_index) => {
                                                                                                    if (original_index === index) {
                                                                                                        return {
                                                                                                            ...original_data,
                                                                                                            color: color
                                                                                                        }
                                                                                                    } else {
                                                                                                        return original_data
                                                                                                    }
                                                                                                }) as StepComponentChartCircles['data']
                                                                                            } as StepComponentChartCircles)} />
                                                                                            <Button className="px-3" variant="ghost" onClick={() => updateEditingComponent({ data: 
                                                                                                component.data.map((original_data, original_index) => {
                                                                                                    if (original_index === index) {
                                                                                                        return {
                                                                                                            ...original_data,
                                                                                                            color: '#000000'
                                                                                                        }
                                                                                                    } else {
                                                                                                        return original_data
                                                                                                    }
                                                                                                }) as StepComponentChartCircles['data']
                                                                                            } as StepComponentChartCircles)}>
                                                                                                <RotateCcw className="h-4 w-4" />
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Button variant={"destructive"} className="w-full" onClick={() => updateEditingComponent({ data: 
                                                                                        component.data.filter((original_data, original_index) => {
                                                                                            return original_index !== index
                                                                                        })
                                                                                    } as StepComponentChartCircles)}>
                                                                                        Remover progresso
                                                                                        <Trash className="h-4 w-4" />
                                                                                    </Button>
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                            </Accordion>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'accordion' && (() => {
                                                        const component = editingComponent as StepComponentAccordion
                                                        return <>
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    Object.entries(component.items).map(([key, item], index) => {
                                                                        return <AccordionItem key={key} value={key}>
                                                                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                                {item.title}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <Label htmlFor="title">Título</Label>
                                                                                    <Input value={item.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    title: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentAccordion['items']
                                                                                    } as StepComponentAccordion)} />
                                                                                    <Label htmlFor="description">Descrição</Label>
                                                                                    <Textarea value={item.description} id="description" placeholder="Descrição do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    description: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentAccordion['items']
                                                                                    } as StepComponentAccordion)} />
                                                                                    <Button variant={"destructive"} className="w-full" onClick={() => updateEditingComponent({ items: 
                                                                                        component.items.filter((original_item, original_index) => {
                                                                                            return original_index !== index
                                                                                        })
                                                                                    } as StepComponentAccordion)}>
                                                                                        Remover item
                                                                                        <Trash className="h-4 w-4" />
                                                                                    </Button>
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                            </Accordion>
                                                            <Button className="w-full" onClick={() => updateEditingComponent({ items: [
                                                                ...component.items,
                                                                {
                                                                    id: Math.random().toString(36).substring(2, 15),
                                                                    title: 'Título do item',
                                                                    description: 'Descrição do item',
                                                                }
                                                            ] as StepComponentAccordion['items']} as StepComponentAccordion)}>
                                                                Adicionar item
                                                            </Button>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'form' && (() => {
                                                        const component = editingComponent as StepComponentForm
                                                        return <>
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    Object.entries(component.items).map(([key, item], index) => {
                                                                        return <AccordionItem key={key} value={key}>
                                                                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                                {item.label}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <Label htmlFor="label">Label</Label>
                                                                                    <Input value={item.label} id="label" placeholder="Label do campo" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    label: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentForm['items']
                                                                                    } as StepComponentForm)} />
                                                                                    
                                                                                    <div className="flex flex-col gap-2">
                                                                                        
                                                                                        <Label htmlFor="type">Tipo</Label>
                                                                                        <RadioGroup value={item.type} onValueChange={(value) => updateEditingComponent({ items: 
                                                                                            component.items.map((original_item, original_index) => {
                                                                                                if (original_index === index) {
                                                                                                    return {
                                                                                                        ...original_item,
                                                                                                        type: value as StepComponentForm['type']
                                                                                                    }
                                                                                                } else {
                                                                                                    return original_item
                                                                                                }
                                                                                            }) as StepComponentForm['items']
                                                                                        } as StepComponentForm)}>
                                                                                            <div className="flex flex-row gap-2">
                                                                                                <RadioGroupItem value="text" id="text" />
                                                                                                <Label htmlFor="text">Texto</Label>
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2">
                                                                                                <RadioGroupItem value="email" id="email" />
                                                                                                <Label htmlFor="email">Email</Label>
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2">
                                                                                                <RadioGroupItem value="phone" id="phone" />
                                                                                                <Label htmlFor="phone">Telefone</Label>
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2">
                                                                                                <RadioGroupItem value="number" id="number" />
                                                                                                <Label htmlFor="number">Número</Label>
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2">
                                                                                                <RadioGroupItem value="textarea" id="textarea" />
                                                                                                <Label htmlFor="textarea">Textarea</Label>
                                                                                            </div>
                                                                                        </RadioGroup>
                                                                                    </div>
                                                                                    {
                                                                                        // placeholder
                                                                                    }
                                                                                    <div className="w-full flex flex-col gap-2">
                                                                                        <Label htmlFor="placeholder">Placeholder</Label>
                                                                                        <Input value={item.placeholder || ''} id="placeholder" placeholder="Placeholder do campo" onChange={(event) => updateEditingComponent({ items: 
                                                                                            component.items.map((original_item, original_index) => {
                                                                                                if (original_index === index) {
                                                                                                    return {
                                                                                                        ...original_item,
                                                                                                        placeholder: event.target.value
                                                                                                    }
                                                                                                } else {
                                                                                                    return original_item
                                                                                                }
                                                                                            }) as StepComponentForm['items']
                                                                                        } as StepComponentForm)} />
                                                                                    </div>
                                                                                    {
                                                                                        // required
                                                                                    }
                                                                                    <div className="w-full flex flex-row justify-start items-center space-x-2">
                                                                                        <Checkbox checked={item.required} id="required" onCheckedChange={(val) => updateEditingComponent({ items: 
                                                                                            component.items.map((original_item, original_index) => {
                                                                                                if (original_index === index) {
                                                                                                    return {
                                                                                                        ...original_item,
                                                                                                        required: val
                                                                                                    }
                                                                                                } else {
                                                                                                    return original_item
                                                                                                }
                                                                                            }) as StepComponentForm['items']
                                                                                        } as StepComponentForm)} />
                                                                                        <Label htmlFor="required">Obrigatório</Label>
                                                                                    </div>
                                                                                    {
                                                                                        // default value
                                                                                    }
                                                                                    <div className="w-full flex flex-col gap-2">
                                                                                        <Label htmlFor="default_value">Valor padrão</Label>
                                                                                        <Input value={item.default_value || ''} id="default_value" placeholder="Valor padrão do campo" onChange={(event) => updateEditingComponent({ items: 
                                                                                            component.items.map((original_item, original_index) => {
                                                                                                if (original_index === index) {
                                                                                                    return {
                                                                                                        ...original_item,
                                                                                                        default_value: event.target.value
                                                                                                    }
                                                                                                } else {
                                                                                                    return original_item
                                                                                                }
                                                                                            }) as StepComponentForm['items']
                                                                                        } as StepComponentForm)} />
                                                                                    </div>
                                                                                    <Button variant={"destructive"} className="w-full" onClick={() => updateEditingComponent({ items: 
                                                                                        component.items.filter((original_item, original_index) => {
                                                                                            return original_index !== index
                                                                                        })
                                                                                    } as StepComponentForm)}>
                                                                                        Remover campo
                                                                                        <Trash className="h-4 w-4" />
                                                                                    </Button>
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                            </Accordion>
                                                            <Button className="w-full" onClick={() => updateEditingComponent({ items: [
                                                                ...component.items,
                                                                {
                                                                    id: Math.random().toString(36).substring(2, 15),
                                                                    type: 'text',
                                                                    label: 'Nome',
                                                                    placeholder: 'Nome do campo',
                                                                    required: false,
                                                                    default_value: '',
                                                                }
                                                            ] as StepComponentForm['items']} as StepComponentForm)}>
                                                                Adicionar campo
                                                            </Button>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'questions' && (() => {
                                                        const component = editingComponent as StepComponentQuestions
                                                        return <>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <div className="text-sm font-medium text-gray-700">
                                                                    Layout
                                                                </div>
                                                                <RadioGroup className="w-full flex-col items-center justify-start" value={component.render} onValueChange={(value) => updateEditingComponent({ render: value as StepComponentQuestions['render'] } as StepComponentQuestions)}>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="list" id="list" />
                                                                        <Label htmlFor="list">Lista</Label>
                                                                    </div>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="grid-2" id="grid-2" />
                                                                        <Label htmlFor="grid-2">Grade 2</Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <div className="text-sm font-medium text-gray-700">
                                                                    Indicador
                                                                </div>
                                                                <RadioGroup className="w-full flex-col items-center justify-start" value={component.action} onValueChange={(value) => updateEditingComponent({ action: value as StepComponentQuestions['action'] } as StepComponentQuestions)}>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="arrow" id="arrow" />
                                                                        <Label htmlFor="arrow">Seta</Label>
                                                                    </div>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="checkbox" id="checkbox" />
                                                                        <Label htmlFor="checkbox">Checkbox</Label>
                                                                    </div>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="default" id="default" />
                                                                        <Label htmlFor="default">Padrão</Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <div className="text-sm font-medium text-gray-700">
                                                                    Posição do emoji
                                                                </div>
                                                                <RadioGroup className="w-full flex-col items-center justify-start" value={component.emoji_position} onValueChange={(value) => updateEditingComponent({ emoji_position: value as StepComponentQuestions['emoji_position'] } as StepComponentQuestions)}>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="left" id="left" />
                                                                        <Label htmlFor="left">Esquerda</Label>
                                                                    </div>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="right" id="right" />
                                                                        <Label htmlFor="right">Direita</Label>
                                                                    </div>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="top" id="top" />
                                                                        <Label htmlFor="top">Topo</Label>
                                                                    </div>
                                                                    <div className="flex flex-row gap-2">
                                                                        <RadioGroupItem value="bottom" id="bottom" />
                                                                        <Label htmlFor="bottom">Baixo</Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    Object.entries(component.items).map(([key, item], index) => {
                                                                        
                                                                        return <AccordionItem key={key} value={key}>
                                                                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                                {item.title}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2 pb-4">
                                                                                    <Label htmlFor="title">Título</Label>
                                                                                    <Input value={item.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    title: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentQuestions['items']
                                                                                    } as StepComponentQuestions)} />
                                                                                    <Label htmlFor="emoji">Emoji</Label>
                                                                                    <Input value={item.emoji} id="emoji" placeholder="Emoji do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    emoji: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentQuestions['items']
                                                                                    } as StepComponentQuestions)} />
                                                                                    <Label htmlFor="image">Imagem</Label>
                                                                                    <Input value={item.image} id="image" placeholder="Imagem do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    image: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentQuestions['items']
                                                                                    } as StepComponentQuestions)} />
                                                                                    {
                                                                                        // remove question
                                                                                    }
                                                                                    <Button variant={"destructive"} className="w-full my-2" onClick={() => updateEditingComponent({ items: 
                                                                                        component.items.filter((original_item, original_index) => {
                                                                                            return original_index !== index
                                                                                        })
                                                                                    } as StepComponentQuestions)}>
                                                                                        Remover pergunta
                                                                                        <Trash className="h-4 w-4" />
                                                                                    </Button>
                                                                                    {
                                                                                        // url
                                                                                    }
                                                                                    <div className="w-full flex flex-col gap-2">
                                                                                        <Label htmlFor="url">URL</Label>
                                                                                        <Input value={item.url || ''} id="url" placeholder="URL do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                            component.items.map((original_item, original_index) => {
                                                                                                if (original_index === index) {
                                                                                                    return {
                                                                                                        ...original_item,
                                                                                                        url: event.target.value
                                                                                                    }
                                                                                                } else {
                                                                                                    return original_item
                                                                                                }
                                                                                            }) as StepComponentQuestions['items']
                                                                                        } as StepComponentQuestions)} />
                                                                                    </div>
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                            </Accordion>
                                                            {
                                                                // add question
                                                            }

                                                            <Button className="w-full" onClick={() => updateEditingComponent({ items: [
                                                                ...component.items,
                                                                {
                                                                    id: Math.random().toString(36).substring(2, 15),
                                                                    title: 'Título da pergunta',
                                                                    emoji: '👋',
                                                                    image: '',
                                                                }
                                                            ] as StepComponentQuestions['items']} as StepComponentQuestions)}>
                                                                Adicionar pergunta
                                                            </Button>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'carrousel' && (() => { 
                                                        const component = editingComponent as StepComponentCarrousel
                                                        return <>
                                                            <Accordion type="single" collapsible className="w-full">
                                                                {
                                                                    Object.entries(component.items).map(([key, item], index) => {
                                                                        return <AccordionItem key={key} value={key}>
                                                                            <AccordionTrigger className="flex flex-row justify-between items-center">
                                                                                {item.title}
                                                                            </AccordionTrigger>
                                                                            <AccordionContent>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <Label htmlFor="title">Título</Label>
                                                                                    <Input value={item.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    title: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentCarrousel['items']
                                                                                    } as StepComponentCarrousel)} />
                                                                                    <Label htmlFor="image">Imagem</Label>
                                                                                    <Input value={item.image} id="image" placeholder="Imagem do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    image: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentCarrousel['items']
                                                                                    } as StepComponentCarrousel)} />
                                                                                    <Label htmlFor="description">Descrição</Label>
                                                                                    <Input value={item.description} id="description" placeholder="Descrição do componente" onChange={(event) => updateEditingComponent({ items: 
                                                                                        component.items.map((original_item, original_index) => {
                                                                                            if (original_index === index) {
                                                                                                return {
                                                                                                    ...original_item,
                                                                                                    description: event.target.value
                                                                                                }
                                                                                            } else {
                                                                                                return original_item
                                                                                            }
                                                                                        }) as StepComponentCarrousel['items']
                                                                                    } as StepComponentCarrousel)} />
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    })
                                                                }
                                                            </Accordion>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'alert' && (() => {
                                                        const component = editingComponent as StepComponentAlert
                                                        return <div className="w-full flex flex-col gap-2">
                                                            <Label htmlFor="text">Texto</Label>
                                                            <Input value={component.text} id="text" placeholder="Texto do alerta" onChange={(event) => updateEditingComponent({ text: event.target.value } as StepComponentAlert)} />
                                                            {
                                                                // color picker
                                                            }
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <ColorPicker value={component.color} id="color" onChange={(val) => updateEditingComponent({ color: val } as StepComponentAlert)} />
                                                            </div>
                                                            {
                                                                // bg color picker
                                                            }
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="bg_color">Cor de fundo</Label>
                                                                <ColorPicker value={component.bg_color} id="bg_color" onChange={(val) => updateEditingComponent({ bg_color: val } as StepComponentAlert)} />
                                                            </div>
                                                        </div>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'script' && (() => {
                                                        const component = editingComponent as StepComponentScript
                                                        return <div className="w-full flex flex-col gap-2">
                                                            <Label htmlFor="script">Script</Label>
                                                            <Textarea value={component.script} id="script" placeholder="Script do componente" onChange={(event) => updateEditingComponent({ script: event.target.value } as StepComponentScript)} />
                                                            <Label htmlFor="location">Local de renderização</Label>
                                                            <Select value={component.location} onValueChange={(value) => updateEditingComponent({ location: value as StepComponentScript['location'] } as StepComponentScript)}>
                                                                <SelectTrigger id="location">
                                                                    <SelectValue placeholder="Selecione o local" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="head">Head</SelectItem>
                                                                    <SelectItem value="footer">Footer</SelectItem>
                                                                    <SelectItem value="inline">No local</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <Label><b>Importante:</b> É necessário exportar o funil novamente quando o local de renderização é alterado!</Label>
                                                        </div>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'notification' && (() => {
                                                        const component = editingComponent as StepComponentNotification
                                                        return <>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="title">Título</Label>
                                                                <Input value={component.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ title: event.target.value } as StepComponentNotification)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="description">Descrição</Label>
                                                                <Input value={component.description} id="description" placeholder="Descrição do componente" onChange={(event) => updateEditingComponent({ description: event.target.value } as StepComponentNotification)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="time_to_exit">Tempo para sair</Label>
                                                                <Input type="number" value={component.time_to_exit} id="time_to_exit" placeholder="Tempo para sair do componente" onChange={(event) => updateEditingComponent({ time_to_exit: parseInt(event.target.value) } as StepComponentNotification)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="position">Posição</Label>
                                                                <Select value={component.position} onValueChange={(value) => updateEditingComponent({ position: value as StepComponentNotification['position'] } as StepComponentNotification)}>
                                                                    <SelectTrigger id="position">
                                                                        <SelectValue placeholder="Selecione uma posição" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="top-right">Topo Direito</SelectItem>
                                                                        <SelectItem value="top-left">Topo Esquerdo</SelectItem>
                                                                        <SelectItem value="bottom-right">Baixo Direito</SelectItem>
                                                                        <SelectItem value="bottom-left">Baixo Esquerdo</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <ColorPicker value={component.color} id="color" onChange={(val) => updateEditingComponent({ color: val } as StepComponentNotification)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'weight' && (() => {
                                                        const component = editingComponent as StepComponentWeight
                                                        return <>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="weight">Peso Inicial</Label>
                                                                <Input type="number" value={component.weight} id="weight" placeholder="Peso do componente" onChange={(event) => updateEditingComponent({ weight: parseInt(event.target.value) } as StepComponentWeight)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <ColorPicker value={component.color} id="color" onChange={(val) => updateEditingComponent({ color: val } as StepComponentWeight)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="title">Título</Label>
                                                                <Input value={component.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ title: event.target.value } as StepComponentWeight)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'height' && (() => {
                                                        const component = editingComponent as StepComponentHeight
                                                        return <>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="height">Altura Inicial</Label>
                                                                <Input type="number" value={component.height} id="height" placeholder="Altura do componente" onChange={(event) => updateEditingComponent({ height: parseInt(event.target.value) } as StepComponentHeight)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <ColorPicker value={component.color} id="color" onChange={(val) => updateEditingComponent({ color: val } as StepComponentHeight)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="title">Título</Label>
                                                                <Input value={component.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ title: event.target.value } as StepComponentHeight)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                                {
                                                    editingComponent.type === 'level' && (() => {
                                                        const component = editingComponent as StepComponentLevel
                                                        return <>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="title">Título</Label>
                                                                <Input value={component.title} id="title" placeholder="Título do componente" onChange={(event) => updateEditingComponent({ title: event.target.value } as StepComponentLevel)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="description">Descrição</Label>
                                                                <Input value={component.description} id="description" placeholder="Descrição do componente" onChange={(event) => updateEditingComponent({ description: event.target.value } as StepComponentLevel)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="value">Valor</Label>
                                                                <Input type="number" value={component.value} id="value" placeholder="Valor do componente" onChange={(event) => updateEditingComponent({ value: parseInt(event.target.value) } as StepComponentLevel)} />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-2">
                                                                <Label htmlFor="color">Cor</Label>
                                                                <ColorPicker value={component.color} id="color" onChange={(val) => updateEditingComponent({ color: val } as StepComponentLevel)} />
                                                            </div>
                                                        </>
                                                    })()
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                </TabsContent>)
            }
            {
                tab === 'results' && (
                    <TabsContent value="results" className="p-2 rounded-sm flex flex-row gap-2">
                        <ListResults funil_id={activeFunil?.id} />
                    </TabsContent>
                )
            }
            {
                tab === 'theme' && (
                    <TabsContent value="theme" className="p-2 rounded-sm flex flex-row gap-2" style={{
                        flexGrow: 1
                    }}>
                        <div className="w-full flex flex-col gap-2" style={{
                            flexGrow: 1
                        }}>
                            <h2 className="text-2xl font-semibold tracking-tight flex flex-row gap-2 items-center justify-start w-full">
                                Tema
                            </h2>
                            <h3 className="text-sm font-medium tracking-tight flex flex-row gap-2 items-center justify-start w-full">
                                Use um tema pré-definido para o funil ou personalize com suas próprias cores.
                            </h3>
                            <div className="w-full flex flex-row gap-2 mt-2">
                                {
                                    defaultThemes.map((theme, index) => {
                                        return <ThemeBall key={index} theme={theme} />
                                    })
                                }
                            </div>
                        </div>
                    </TabsContent>
                )
            }
        </div>
    </Tabs>
}

const ThemeBall = ({ theme, active, onClick }: { theme: Theme, active?: boolean, onClick?: () => void }) => {
    return <div className="flex w-32 group flex-col gap-2 items-center justify-center cursor-pointer" onClick={onClick}>
        <div className="w-20 h-20 bg-white rounded-full ring-2 ring-neutral-200 overflow-hidden relative flex flex-row flex-wrap rotate-45 group-hover:ring-neutral-300 group-hover:shadow-md shadow-none transition-all duration-300 ease-in-out">
            <div className="w-10 h-10" style={{
                backgroundColor: theme.colors.primary
            }}>

            </div>
            <div className="w-10 h-10" style={{
                backgroundColor: theme.colors.bg
            }}>

            </div>
            <div className="w-10 h-10" style={{
                backgroundColor: theme.colors.text
            }}>

            </div>
            <div className="w-10 h-10" style={{
                backgroundColor: theme.colors.funil_bg
            }}>

            </div>
        </div>
        <span className={`text-sm font-medium text-neutral-500 group-hover:text-neutral-700 ${active ? '!font-bold' : ''}`}>
            {theme.name}
        </span>
    </div>
}

interface HoverEffectProps {
    label?: string
    onMoveUp?: () => void
    onMoveDown?: () => void
    index: number
    hasUp: boolean
    hasDown: boolean
    active: boolean
    onClick?: () => void
}

function HoverButtonArrow({
    hasUp,
    hasDown,
    label = 'Hover me',
    onMoveUp = () => console.log('Move up'),
    index,
    active,
    onClick,
    onMoveDown = () => console.log('Move down')
}: HoverEffectProps) {
    const [isHovered, setIsHovered] = useState(false)
  
    return (
      <div 
          className="flex bg-white rounded-md ring-1 ring-neutral-200 m-[1px] transition-all duration-300 ease-in-out hover:ring-neutral-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`flex flex-col transition-all duration-300 ease-in-out ${isHovered ? 'w-8' : 'w-0'} overflow-hidden`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-none border-r border-gray-200 h-[50%] w-8"
              onClick={onMoveUp}
              disabled={!hasUp}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-none border-r border-t border-gray-200 h-[50%] w-8"
              onClick={onMoveDown}
              disabled={!hasDown}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 p-3 cursor-pointer" onClick={onClick}>
            
            <span className="text-sm font-bold text-gray-700">{index + 1}.</span>
            <span className={"text-sm font-medium text-gray-700 "+ (active ? "!font-bold" : "")}>{label}</span>
          </div>
        </div>
    )
}

// Create a new DraggableStep component
const DraggableStep = ({ 
  step, 
  index,
  moveStep,
  setActiveStep,
  ActiveStepIndex,
  stepsLength,
  handleMoveStepUp,
  handleMoveStepDown 
}: {
    step: Step
    index: number
    moveStep: (from: number, to: number) => void
    setActiveStep: (step: string) => void
    ActiveStepIndex: number
    stepsLength: number
    handleMoveStepUp: (step: Step, index: number) => void
    handleMoveStepDown: (step: Step, index: number) => void
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'STEP',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'STEP',
    hover: (item: { index: number }) => {
      if (item.index === index) return
      moveStep(item.index, index)
      item.index = index
    },
  })

  return (
    <div 
      // @ts-expect-error This lib should work
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <HoverButtonArrow 
        key={step.id} 
        label={step.name} 
        onClick={() => setActiveStep(step.id)}
        onMoveUp={() => handleMoveStepUp(step, index)} 
        onMoveDown={() => handleMoveStepDown(step, index)} 
        index={index}
        active={index === ActiveStepIndex}
        hasUp={stepsLength > 1 && index > 0}
        hasDown={stepsLength > 1 && index < stepsLength - 1}
      />
    </div>
  )
}
