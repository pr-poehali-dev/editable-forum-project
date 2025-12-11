import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/icon'

interface Topic {
  id: number
  title: string
  author: string
  category: string
  replies: number
  views: number
  lastActivity: string
  isHot: boolean
  isPinned: boolean
}

interface Category {
  id: number
  name: string
  icon: string
  topicsCount: number
  postsCount: number
  description: string
}

const mockTopics: Topic[] = [
  {
    id: 1,
    title: 'Добро пожаловать на наш форум! Правила и рекомендации',
    author: 'Администратор',
    category: 'Новости',
    replies: 45,
    views: 1230,
    lastActivity: '5 мин назад',
    isHot: true,
    isPinned: true
  },
  {
    id: 2,
    title: 'Обсуждение новых функций платформы',
    author: 'TechGuru',
    category: 'Разработка',
    replies: 89,
    views: 3450,
    lastActivity: '15 мин назад',
    isHot: true,
    isPinned: false
  },
  {
    id: 3,
    title: 'Как оптимизировать производительность веб-приложений?',
    author: 'DevExpert',
    category: 'Обучение',
    replies: 34,
    views: 890,
    lastActivity: '1 час назад',
    isHot: false,
    isPinned: false
  },
  {
    id: 4,
    title: 'Лучшие практики UI/UX дизайна в 2024',
    author: 'DesignerPro',
    category: 'Дизайн',
    replies: 67,
    views: 2100,
    lastActivity: '2 часа назад',
    isHot: true,
    isPinned: false
  }
]

const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Новости',
    icon: 'Newspaper',
    topicsCount: 45,
    postsCount: 890,
    description: 'Последние новости и обновления'
  },
  {
    id: 2,
    name: 'Разработка',
    icon: 'Code2',
    topicsCount: 234,
    postsCount: 5670,
    description: 'Обсуждение технических вопросов'
  },
  {
    id: 3,
    name: 'Дизайн',
    icon: 'Palette',
    topicsCount: 156,
    postsCount: 3200,
    description: 'UI/UX и графический дизайн'
  },
  {
    id: 4,
    name: 'Обучение',
    icon: 'GraduationCap',
    topicsCount: 189,
    postsCount: 4100,
    description: 'Образовательные материалы'
  }
]

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const filteredTopics = mockTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Icon name="MessageSquare" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ForumPro
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-base">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" className="text-base">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Обсуждения
            </Button>
            <Button variant="ghost" className="text-base">
              <Icon name="Grid3x3" size={18} className="mr-2" />
              Категории
            </Button>
            <Button variant="ghost" className="text-base">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Вход</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Войти в аккаунт</DialogTitle>
                      <DialogDescription>
                        Введите свои данные для входа
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full gradient-primary" onClick={() => setIsLoggedIn(true)}>
                        Войти
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gradient-primary">Регистрация</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Создать аккаунт</DialogTitle>
                      <DialogDescription>
                        Зарегистрируйтесь для участия в обсуждениях
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input id="username" placeholder="username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email</Label>
                        <Input id="reg-email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Пароль</Label>
                        <Input id="reg-password" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full gradient-primary" onClick={() => setIsLoggedIn(true)}>
                        Зарегистрироваться
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Icon name="Bell" size={20} />
                </Button>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="gradient-primary text-white font-semibold">
                    ВЫ
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-4xl font-bold">Добро пожаловать!</h2>
              <p className="text-muted-foreground">
                Присоединяйтесь к обсуждениям и делитесь знаниями
              </p>
            </div>
            <Button size="lg" className="gradient-primary">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать тему
            </Button>
          </div>

          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="Поиск по темам и постам..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                <TabsTrigger value="all" className="gap-2">
                  <Icon name="MessageSquare" size={16} />
                  Все темы
                </TabsTrigger>
                <TabsTrigger value="hot" className="gap-2">
                  <Icon name="Flame" size={16} />
                  Популярное
                </TabsTrigger>
                <TabsTrigger value="new" className="gap-2">
                  <Icon name="Sparkles" size={16} />
                  Новое
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-3">
                {filteredTopics.map((topic) => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer animate-fade-in">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {topic.isPinned && (
                              <Badge variant="secondary" className="gap-1">
                                <Icon name="Pin" size={12} />
                                Закреплено
                              </Badge>
                            )}
                            {topic.isHot && (
                              <Badge className="gradient-accent gap-1">
                                <Icon name="TrendingUp" size={12} />
                                Горячая тема
                              </Badge>
                            )}
                            <Badge variant="outline">{topic.category}</Badge>
                          </div>
                          <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                            {topic.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {topic.author.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{topic.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageSquare" size={14} />
                            <span>{topic.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            <span>{topic.views}</span>
                          </div>
                        </div>
                        <span className="text-muted-foreground">{topic.lastActivity}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="hot" className="mt-4 space-y-3">
                {filteredTopics.filter(t => t.isHot).map((topic) => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="gradient-accent gap-1">
                              <Icon name="Flame" size={12} />
                              Горячее
                            </Badge>
                            <Badge variant="outline">{topic.category}</Badge>
                          </div>
                          <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                            {topic.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {topic.author.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{topic.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageSquare" size={14} />
                            <span>{topic.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            <span>{topic.views}</span>
                          </div>
                        </div>
                        <span className="text-muted-foreground">{topic.lastActivity}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="new" className="mt-4 space-y-3">
                {filteredTopics.slice(0, 2).map((topic) => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="gap-1">
                              <Icon name="Sparkles" size={12} />
                              Новое
                            </Badge>
                            <Badge variant="outline">{topic.category}</Badge>
                          </div>
                          <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                            {topic.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {topic.author.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{topic.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageSquare" size={14} />
                            <span>{topic.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            <span>{topic.views}</span>
                          </div>
                        </div>
                        <span className="text-muted-foreground">{topic.lastActivity}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="gradient-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Grid3x3" size={20} />
                  Категории
                </CardTitle>
                <CardDescription className="text-white/80">
                  Найдите интересующую тему
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {mockCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={category.icon as any} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{category.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{category.topicsCount} тем</span>
                          <span>•</span>
                          <span>{category.postsCount} постов</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Всего тем</span>
                  <span className="font-bold text-lg">624</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Всего постов</span>
                  <span className="font-bold text-lg">13,860</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Пользователей</span>
                  <span className="font-bold text-lg">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Онлайн сейчас</span>
                  <span className="font-bold text-lg text-green-500">143</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index