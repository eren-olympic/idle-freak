'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Star, Clock, User, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Photocard, MEMBERS, RARITY_LEVELS } from '@/lib/types';

interface PhotocardItemProps {
  photocard: Photocard;
  onToggleFavorite?: (id: number) => void;
  onRequestExchange?: (id: number) => void;
  isFavorite?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function PhotocardItem({ 
  photocard, 
  onToggleFavorite, 
  onRequestExchange, 
  isFavorite = false,
  className,
  style
}: PhotocardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const member = MEMBERS[photocard.member];
  const rarity = RARITY_LEVELS[photocard.rarity];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(photocard.id);
  };

  const handleExchangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className={cn("masonry-item", className)} style={style}>
        <Card className="photocard-3d group overflow-hidden border-0 bg-card/90 backdrop-blur-sm">
          <div 
            className={cn("card-flip relative", isFlipped && "flipped")}
            onClick={handleCardClick}
          >
            {/* 正面 - 小卡照片 */}
            <div className="card-face">
              <CardContent className="p-0">
                <div className="relative">
                  {/* 主要圖片 */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <Image
                      src={photocard.image_url}
                      alt={photocard.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* 漸變遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    
                    {/* 收藏愛心 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute right-2 top-2 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm",
                        "hover:bg-black/30 transition-all duration-200",
                        isFavorite && "text-red-500"
                      )}
                      onClick={handleFavoriteClick}
                    >
                      <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                    </Button>
                    
                    {/* 成員標籤 */}
                    <div className="absolute left-2 top-2">
                      <Badge 
                        className={cn(
                          "text-white font-semibold text-xs px-2 py-1 rounded-full",
                          `member-${photocard.member.toLowerCase()}`
                        )}
                        style={{ backgroundColor: member.color }}
                      >
                        {member.name}
                      </Badge>
                    </div>
                    
                    {/* 稀有度星星 */}
                    <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                      {Array.from({ length: rarity.stars }).map((_, index) => (
                        <Star 
                          key={index} 
                          className="h-3 w-3 fill-current text-yellow-400" 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* 卡片資訊 */}
                  <div className="p-3 space-y-2">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {photocard.name}
                      </h3>
                      {photocard.album && (
                        <p className="text-xs text-muted-foreground">
                          {photocard.album} {photocard.version && `(${photocard.version})`}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{photocard.uploaded_by || '匿名用戶'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{photocard.uploaded_at || '剛剛'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
            
            {/* 背面 - 詳細資訊 */}
            <div className="card-face card-back bg-card">
              <CardContent className="p-4 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">{photocard.name}</h3>
                    <p className="text-muted-foreground">{member.name}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {photocard.album && (
                      <div>
                        <span className="font-medium">專輯：</span>
                        <span className="text-muted-foreground">{photocard.album}</span>
                      </div>
                    )}
                    {photocard.version && (
                      <div>
                        <span className="font-medium">版本：</span>
                        <span className="text-muted-foreground">{photocard.version}</span>
                      </div>
                    )}
                    {photocard.release_year && (
                      <div>
                        <span className="font-medium">發行年份：</span>
                        <span className="text-muted-foreground">{photocard.release_year}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium">稀有度：</span>
                      <Badge variant="secondary" className="ml-2">
                        {rarity.label}
                      </Badge>
                    </div>
                  </div>
                  
                  {photocard.owner_preferences && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">交換偏好：</h4>
                      {photocard.owner_preferences.wanted_members && (
                        <div>
                          <span className="text-xs text-muted-foreground">想要成員：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {photocard.owner_preferences.wanted_members.map((memberName) => (
                              <Badge 
                                key={memberName}
                                variant="outline" 
                                className="text-xs"
                                style={{ borderColor: MEMBERS[memberName].color }}
                              >
                                {MEMBERS[memberName].name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    size="sm"
                    className="neon-button flex-1"
                    onClick={handleExchangeClick}
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    申請交換
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "transition-colors duration-200",
                      isFavorite ? "text-red-500 border-red-500" : ""
                    )}
                    onClick={handleFavoriteClick}
                  >
                    <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* 交換申請對話框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>申請交換小卡</DialogTitle>
            <DialogDescription>
              您想要與此用戶交換 {member.name} 的小卡「{photocard.name}」
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              請選擇您想要用來交換的小卡，或者發送訊息與對方討論交換條件。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button 
              className="neon-button"
              onClick={() => {
                onRequestExchange?.(photocard.id);
                setIsDialogOpen(false);
              }}
            >
              發送交換請求
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}