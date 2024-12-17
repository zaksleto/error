import { clsx, type ClassValue } from "clsx"
import { Timestamp } from "firebase/firestore"
import { Loader, Radio, Wrench } from "lucide-react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type Priority = 'Alta' | 'Média' | 'Baixa'
export type Status = 'Ativo' | 'Inativo' | 'Em construção'
export type Tag = 'Leads' | 'Outro' | 'Comunidade'
export type Funil = {
  id: string
  name: string
  description: string
  priority: Priority
  status: Status
  tag: Tag
  created_at: Date
  n_answers: number
  n_access: number
}

export type StepComponentType = 'text' | 'timer' | 'image' | 'spacer' | 'benefits' | 'button' | 'progress' | 'feedback' | 'chart' | 'audio' | 'carrousel' | 'video' | 'accordion' | 'price' | 'questions' | 'chart_circles' | 'form' | 'alert' | 'script' | 'notification' | 'weight' | 'height' | 'level'
export type AnyStepComponent = StepComponent | StepComponentText | StepComponentTimer | StepComponentImage | StepComponentSpacer | StepComponentBenefits | StepComponentButton | StepComponentProgress | StepComponentFeedback | StepComponentChartLine | StepComponentChartCircles | StepComponentAudio | StepComponentCarrousel | StepComponentVideo | StepComponentAccordion | StepComponentPrice | StepComponentQuestions | StepComponentForm | StepComponentAlert | StepComponentScript
export type StepComponent = {
  id?: string
  index?: number
  type: StepComponentType
}

export type StepComponentText = StepComponent & {
  type: 'text'
  headline: string
  description?: string
  color: string
  bg_color: string
}
export type StepComponentLevel = StepComponent & {
  type: 'level'
  title: string
  description: string
  color: string
  value: number
}
export type StepComponentTimer = StepComponent & {
  type: 'timer'
  headline: string
  description: string
  end_description: string
  duration?: number
  date?: Date
  text_color?: string
  bg_color?: string
  reset?: boolean
  use: 'duration' | 'date'
}
export type StepComponentImage = StepComponent & {
  type: 'image'
  src: string
  alt: string
}
export type StepComponentSpacer = StepComponent & {
  type: 'spacer'
  height: number
}
export type StepComponentBenefits = StepComponent & {
  type: 'benefits'
  headline: string
  description: string
  comparisons: string[]
  benefits: {
    [id: string]: {
      title: string
      comparisons: string[]
    }
  }
}
export type StepComponentScript = StepComponent & {
  type: 'script'
  script: string
  location: 'head' | 'footer' | 'inline'
}
export type UserInfo = {
  timestamp: string
  userAgent: string
  platform: string
  language: string
  screenResolution: string
  viewportSize: string
  referrer: string
  timeZone: string
  colorDepth: number
  online: boolean
  cookiesEnabled: boolean
}
export type End = {
  date: Timestamp
  funil_id: string
  user_info: UserInfo
  id: string
  form_values?: {
    id: string
    value: string
    type: StepComponentFormItem['type']
    label?: string
  }[]
}
export type Acesso = {
  date: Timestamp
  funil_id: string
  user_info: UserInfo
  id: string
}
export type StepComponentButton = StepComponent & {
  type: 'button'
  label: string
  destiny: 'next' | 'url'
  destiny_url?: string
  facebook_event?: 'lead' | 'purchase' | 'initiatecheckout' | 'custom'
  facebook_custom_event?: string
  delay?: number
  color?: string
  is_end?: boolean
}
export type StepComponentProgress = StepComponent & {
  type: 'progress'
  title: string
  final_progress: number
  duration: number
  destiny: 'next' | 'url'
  destiny_url?: string
}
export type FeedbackItem = {
  id: string
  title: string
  social: string
  description: string
  stars: number
  avatar_src: string
}
export type StepComponentFeedback = StepComponent & {
  type: 'feedback'
  carousel: boolean
  feedbacks: FeedbackItem[]
}
export type DataPoint = {
  name: string
  value: number
  highlight?: boolean
  color?: string
}
export type StepComponentChartLine = StepComponent & {
  type: 'chart'
  mode: 'line' | 'bar' | 'pie' | 'doughnut'
  title: string
  description: string
  color?: string
  data: DataPoint[]
}
export type DataProgress = {
  type: 'circle' | 'bar'
  value: number
  time: number
  color?: string
  description: string
}
export type StepComponentChartCircles = StepComponent & {
  type: 'chart_circles'
  n_columns: number
  data: DataProgress[]
}
export type StepComponentAudio = StepComponent & {
  type: 'audio'
  src: string
  is_b64?: boolean
  avatar: string
}
export type StepComponentCarrouselItem = {
  id: string
  title: string
  description: string
  image: string
}
export type StepComponentCarrousel = StepComponent & {
  type: 'carrousel'
  items: StepComponentCarrouselItem[]
}
export type StepComponentVideo = StepComponent & {
  type: 'video'
  iframe?: string
  id?: string
  url?: string
}
export type StepComponentAccordionItem = {
  id: string
  title: string
  description: string
}
export type StepComponentAccordion = StepComponent & {
  type: 'accordion'
  items: StepComponentAccordionItem[]
}
export type StepComponentPricePlan = {
  id: string
  title: string
  description: string
  price: number
  descount?: number
  currency?: string
  highlight?: boolean
  url?: string
}
export type StepComponentPrice = StepComponent & {
  type: 'price'
  plans: StepComponentPricePlan[]
  button_text: string
  text_highlight?: string
  UTM_redirect: boolean
  border_radius?: number
  color?: string
}
export type StepComponentQuestionsItem = {
  id: string
  emoji: string
  image?: string
  title: string
  url?: string
}
export type StepComponentQuestions = StepComponent & {
  type: 'questions'
  items: StepComponentQuestionsItem[]
  render: 'list' | 'grid-2'
  action: 'arrow' | 'checkbox' | 'default'
  emoji_position: 'left' | 'right' | 'top' | 'bottom'
}
export type StepComponentFormItem = {
  id: string
  type: 'text' | 'email' | 'phone' | 'number' | 'textarea'
  label: string
  placeholder?: string
  required?: boolean
  default_value?: string
  value?: string
}
export type StepComponentForm = StepComponent & {
  type: 'form'
  items: StepComponentFormItem[]
}
export type StepComponentAlert = StepComponent & {
  type: 'alert'
  text: string
  color: string
  bg_color: string
}
export type StepComponentNotification = StepComponent & {
  type: 'notification'
  title: string
  description: string
  color: string
  time_to_exit: number
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}
export type StepComponentWeight = StepComponent & {
  type: 'weight'
  weight: number
  color: string
  title: string
}
export type StepComponentHeight = StepComponent & {
  type: 'height'
  height: number
  color: string
  title: string
}
export type Step = {
  id: string
  name: string
  description?: string
  contents: StepComponent[]
}
export type FunilStructure = {
  funil_id: string
  steps: Step[]
}

export type AnalyticFunil = {
  id: string
  access_dates: Date[]
  answers_dates: Date[]
}

export const StatusIcons: Record<Status, React.FC<React.SVGAttributes<SVGElement>>> = {
  Ativo: Radio,
  Inativo: Loader,
  'Em construção': Wrench,
}

export const PriorityColors: Record<Priority, string> = {
  Alta: '#dc2626',
  Média: '#f59e0b',
  Baixa: '#a8a29e',
}
export function formatRelativeDate(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((Number(now) - Number(date)) / 1000);

  const intervals: {
    label: Intl.RelativeTimeFormatUnit;
    seconds: number;
  }[] = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

  for (const interval of intervals) {
    const amount = Math.floor(diffInSeconds / interval.seconds);
    if (amount !== 0) {
      return formatter.format(-amount, interval.label);
    }
  }

  return formatter.format(0, 'second'); // "agora mesmo"
}

export const stepComponents: {
  text: StepComponentText,
  timer: StepComponentTimer,
  image: StepComponentImage,
  spacer: StepComponentSpacer,
  benefits: StepComponentBenefits,
  button: StepComponentButton,
  progress: StepComponentProgress,
  feedback: StepComponentFeedback,
  chart: StepComponentChartLine,
  chart_circles: StepComponentChartCircles,
  audio: StepComponentAudio,
  carrousel: StepComponentCarrousel,
  video: StepComponentVideo,
  accordion: StepComponentAccordion,
  price: StepComponentPrice,
  questions: StepComponentQuestions,
  form: StepComponentForm,
  alert: StepComponentAlert,
  script: StepComponentScript,
  notification: StepComponentNotification,
  weight: StepComponentWeight,
  height: StepComponentHeight,
  level: StepComponentLevel,
} = {
  text: {
    type: 'text',
    headline: 'Texto',
    description: 'Descrição do componente',
    color: '#000000',
    bg_color: '#ffffff',
  },
  timer: {
    type: 'timer',
    headline: 'Texto',
    description: 'Descrição do componente',
    end_description: 'Texto final',
    duration: 10,
    date: new Date('2025-06-01T00:00:00.000Z'),
    use: 'duration',
    text_color: '#000000',
    bg_color: '#ffffff',
  },
  image: {
    type: 'image',
    src: '/placeholder.jpg',
    alt: 'O título dessa imagem',
  },
  spacer: {
    type: 'spacer',
    height: 0,
  },
  benefits: {
    type: 'benefits',
    headline: 'Benefícios do seu produto',
    description: 'Descrição do componente',
    comparisons: ['Antes', 'Depois'],
    benefits: {
      'melhores-conversoes': {
        title: 'Melhores conversões',
        comparisons: ['10 conversões por dia', '+50 conversões por dia'],
      },
      'mais-clientes': {
        title: 'Mais clientes',
        comparisons: ['20 clientes', '100 clientes'],
      },
      'mais-visitantes': {
        title: 'Mais visitantes',
        comparisons: ['100 visitantes p/mês', '+500 visitantes p/mês'],
      },
    },
  },
  button: {
    type: 'button',
    label: 'Label do botão',
    destiny: 'next',
  },
  progress: {
    type: 'progress',
    title: 'Progresso',
    final_progress: 50,
    destiny: 'next',
    duration: 10,
  },
  feedback: {
    type: 'feedback',
    carousel: true,
    feedbacks: [
      {
        id: '1',
        title: 'Feedback 1',
        social: 'facebook',
        description: 'Descrição do feedback',
        stars: 5,
        avatar_src: 'https://nextjs.org/icons/next.svg',
      },
      {
        id: '2',
        title: 'Feedback 2',
        social: 'twitter',
        description: 'Descrição do feedback',
        stars: 4,
        avatar_src: 'https://nextjs.org/icons/next.svg',
      },
      {
        id: '3',
        title: 'Feedback 3',
        social: 'instagram',
        description: 'Descrição do feedback',
        stars: 3,
        avatar_src: 'https://nextjs.org/icons/next.svg',
      },
    ],
  },
  chart: {
    type: 'chart',
    mode: 'line',
    title: 'Gráfico',
    description: 'Descrição do gráfico',
    data: [
      {
        name: 'Janeiro',
        value: 10,
      },
      {
        name: 'Fevereiro',
        value: 20,
      },
      {
        name: 'Março',
        value: 30,
      },
      {
        name: 'Abril',
        value: 40,
      },
      {
        name: 'Maio',
        value: 50,
      },
      {
        name: 'Junho',
        value: 60,
      },
      {
        name: 'Julho',
        value: 70,
      },
      {
        name: 'Agosto',
        value: 75,
      },
      {
        name: 'Setembro',
        value: 80,
      },
      {
        name: 'Outubro',
        value: 100,
      },
    ],
  },
  chart_circles: {
    type: 'chart_circles',
    n_columns: 3,
    data: [
      {
        type: 'circle',
        value: 10,
        time: 1,
        description: '10 visitantes',
      },
      {
        type: 'circle',
        value: 20,
        time: 2,
        description: '20 visitantes',
      },
      {
        type: 'circle',
        value: 30,
        time: 3,
        description: '30 visitantes',
      },
    ],
  },
  audio: {
    type: 'audio',
    src: '/audio.mp3',
    avatar: 'https://nextjs.org/icons/next.svg',
  },
  carrousel: {
    type: 'carrousel',
    items: [
      {
        id: '1',
        title: 'Carrossel 1',
        description: 'Descrição do carrossel',
        image: 'https://nextjs.org/icons/next.svg',
      },
      {
        id: '2',
        title: 'Carrossel 2',
        description: 'Descrição do carrossel',
        image: 'https://nextjs.org/icons/next.svg',
      },
      {
        id: '3',
        title: 'Carrossel 3',
        description: 'Descrição do carrossel',
        image: 'https://nextjs.org/icons/next.svg',
      },
    ],
  },
  video: {
    type: 'video',
    url: '/video.mp4',
  },
  accordion: {
    type: 'accordion',
    items: [
      {
        id: '1',
        title: 'Título do Accordion 1',
        description: 'Descrição do accordion 1',
      },
      {
        id: '2',
        title: 'Título do Accordion 2',
        description: 'Descrição do accordion 2',
      },
      {
        id: '3',
        title: 'Título do Accordion 3',
        description: 'Descrição do accordion 3',
      },
    ],
  },
  price: {
    type: 'price',
    plans: [
      {
        id: '1',
        title: 'Plano Básico',
        description: 'Para começar',
        price: 29.90,
        currency: 'R$',
      },
      {
        id: '2',
        title: 'Plano Pro',
        description: 'Para profissionais',
        price: 59.90,
        currency: 'R$',
        highlight: true,
      },
      {
        id: '3',
        title: 'Plano Enterprise',
        description: 'Para empresas',
        price: 99.90,
        currency: 'R$',
      },
    ],
    button_text: 'Escolher plano',
    UTM_redirect: true,
  },
  questions: {
    type: 'questions',
    items: [
      {
        id: '1',
        emoji: '👋',
        title: 'Pergunta 1',
      },
      {
        id: '2',
        emoji: '🎉',
        title: 'Pergunta 2',
      },
      {
        id: '3',
        emoji: '🚀',
        title: 'Pergunta 3',
      },
    ],
    render: 'list',
    action: 'default',
    emoji_position: 'left',
  },
  form: {
    type: 'form',
    items: [
      {
        id: '1',
        type: 'text',
        label: 'Nome',
        placeholder: 'Digite seu nome',
        required: true,
      },
      {
        id: '2',
        type: 'email',
        label: 'Email',
        placeholder: 'Digite seu email',
        required: true,
      },
      {
        id: '3',
        type: 'textarea',
        label: 'Mensagem',
        placeholder: 'Digite sua mensagem',
        required: false,
      },
    ],
  },
  alert: {
    type: 'alert',
    text: 'Texto do alerta',
    color: '#ef4444',
    bg_color: '#fecaca',
  },
  script: {
    type: 'script',
    script: '<script async>console.log("Olá, mundo!");</script>',
    location: 'head',
  },
  notification: {
    type: 'notification',
    title: 'Título da notificação',
    description: 'Descrição da notificação',
    color: '#ef4444',
    time_to_exit: 5,
    position: 'top-right',
  },
  weight: {
    type: 'weight',
    weight: 100,
    color: '#ef4444',
    title: 'Seu peso',
  },
  height: {
    type: 'height',
    height: 100,
    color: '#ef4444',
    title: 'Sua altura',
  },
  level: {
    type: 'level',
    title: 'Seu nível',
    description: 'Descrição do nível',
    color: '#ef4444',
    value: 10,
  },
}
