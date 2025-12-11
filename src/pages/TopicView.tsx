import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

interface Comment {
  id: number
  author: string
  avatar?: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

const mockTopicData = {
  1: {
    title: 'Добро пожаловать на наш форум! Правила и рекомендации',
    author: 'Администратор',
    category: 'Новости',
    content: 'Добро пожаловать на наш форум! Мы рады видеть вас здесь. Это пространство для обмена знаниями, обсуждения идей и взаимопомощи.\n\nПожалуйста, соблюдайте следующие правила:\n\n1. Будьте вежливы и уважительны ко всем участникам\n2. Не публикуйте спам и рекламу\n3. Используйте поиск перед созданием новой темы\n4. Пишите содержательные сообщения\n5. Выбирайте правильную категорию для своих тем\n\nНарушители правил могут быть заблокированы модераторами. Давайте создадим дружелюбное и полезное сообщество вместе!',
    timestamp: '10 декабря 2024, 15:30',
    views: 1230,
    isPinned: true,
    isHot: true
  },
  2: {
    title: 'Обсуждение новых функций платформы',
    author: 'TechGuru',
    category: 'Разработка',
    content: 'Привет всем! Хочу обсудить какие новые функции вы хотели бы видеть на нашей платформе.\n\nЛично я считаю, что было бы здорово добавить:\n- Темную тему для интерфейса\n- Систему достижений и бейджей\n- Возможность создавать опросы в темах\n- Интеграцию с GitHub для разработчиков\n\nЧто думаете? Какие функции были бы полезны вам?',
    timestamp: '11 декабря 2024, 09:15',
    views: 3450,
    isPinned: false,
    isHot: true
  }
}

const mockComments: Record<number, Comment[]> = {
  1: [
    {
      id: 1,
      author: 'DevExpert',
      content: 'Отличные правила! Спасибо за создание этого форума. Уже нашёл много полезной информации.',
      timestamp: '2 часа назад',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'DesignerPro',
      content: 'Согласен со всеми пунктами. Особенно важно соблюдать правило №1 - уважение к другим участникам.',
      timestamp: '1 час назад',
      likes: 8,
      isLiked: true
    },
    {
      id: 3,
      author: 'CodeMaster',
      content: 'А есть ли возможность редактировать свои сообщения после публикации?',
      timestamp: '30 минут назад',
      likes: 3,
      isLiked: false
    }
  ],
  2: [
    {
      id: 1,
      author: 'UIEnthusiast',
      content: 'Темная тема - это must have! Многие пользователи работают вечером и им было бы комфортнее.',
      timestamp: '45 минут назад',
      likes: 15,
      isLiked: true
    },
    {
      id: 2,
      author: 'BackendDev',
      content: 'Интеграция с GitHub звучит интересно. Можно было бы автоматически создавать темы для новых релизов.',
      timestamp: '20 минут назад',
      likes: 7,
      isLiked: false
    }
  ]
}

const TopicView = () => {
  const navigate = useNavigate()
  const { topicId } = useParams<{ topicId: string }>()
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>(mockComments[Number(topicId)] || [])
  const [isLoggedIn] = useState(false)
  
  const topic = mockTopicData[Number(topicId) as keyof typeof mockTopicData]

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Тема не найдена</h2>
          <p className="text-muted-foreground mb-4">Запрашиваемая тема не существует</p>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </Card>
      </div>
    )
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const comment: Comment = {
      id: comments.length + 1,
      author: 'Вы',
      content: newComment,
      timestamp: 'только что',
      likes: 0,
      isLiked: false
    }
    
    setComments([...comments, comment])
    setNewComment('')
  }

  const handleToggleLike = (commentId: number) => {
    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
        : c
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Icon name="MessageSquare" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ForumPro
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Share2" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Bookmark" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="overflow-hidden animate-fade-in">
            <CardHeader className="space-y-4 pb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {topic.isPinned && (
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="Pin" size={12} />
                    Закреплено
                  </Badge>
                )}
                {topic.isHot && (
                  <Badge className="gradient-accent gap-1">
                    <Icon name="Flame" size={12} />
                    Горячая тема
                  </Badge>
                )}
                <Badge variant="outline">{topic.category}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {topic.title}
              </h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="gradient-primary text-white font-semibold">
                      {topic.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{topic.author}</p>
                    <p className="text-sm text-muted-foreground">{topic.timestamp}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={16} />
                    <span>{topic.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageSquare" size={16} />
                    <span>{comments.length}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-6">
              <div className="prose prose-gray max-w-none">
                {topic.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0 whitespace-pre-line leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Комментарии ({comments.length})
                </h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="MessageSquare" size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Пока нет комментариев. Будьте первым!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="group">
                      <div className="flex gap-4">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {comment.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{comment.author}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          
                          <p className="text-foreground leading-relaxed">{comment.content}</p>
                          
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`gap-1 ${comment.isLiked ? 'text-primary' : ''}`}
                              onClick={() => handleToggleLike(comment.id)}
                            >
                              <Icon name={comment.isLiked ? "Heart" : "Heart"} size={16} className={comment.isLiked ? 'fill-current' : ''} />
                              <span>{comment.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Icon name="Reply" size={16} />
                              Ответить
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {comment.id !== comments[comments.length - 1].id && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Добавить комментарий</h3>
                {isLoggedIn ? (
                  <>
                    <Textarea
                      placeholder="Напишите свой комментарий..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {newComment.length}/1000 символов
                      </p>
                      <Button 
                        className="gradient-primary"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить
                      </Button>
                    </div>
                  </>
                ) : (
                  <Card className="p-6 text-center bg-muted/50">
                    <Icon name="Lock" size={32} className="mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      Войдите или зарегистрируйтесь, чтобы оставлять комментарии
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline">Вход</Button>
                      <Button className="gradient-primary">Регистрация</Button>
                    </div>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default TopicView
