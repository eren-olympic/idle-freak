'use client';

import { useState, useEffect } from 'react';
import { PhotocardItem } from '@/components/PhotocardItem';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Photocard, FilterOptions } from '@/lib/types';
import { convertProductToPhotocard, filterPhotocards, ProductData } from '@/lib/utils';

export default function Home() {
  const [photocards, setPhotocards] = useState<Photocard[]>([]);
  const [filteredPhotocards, setFilteredPhotocards] = useState<Photocard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterOptions>({
    members: [],
    albums: [],
    rarity: []
  });

  // 載入小卡數據
  const loadPhotocards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to load photocards');
      }
      
      const products: ProductData[] = await response.json();
      const convertedPhotocards = products.map(convertProductToPhotocard);
      
      setPhotocards(convertedPhotocards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 初始載入
  useEffect(() => {
    loadPhotocards();
  }, []);

  // 套用篩選
  useEffect(() => {
    const filtered = filterPhotocards(photocards, filters);
    setFilteredPhotocards(filtered);
  }, [photocards, filters]);

  // 處理收藏切換
  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // 處理交換請求
  const handleRequestExchange = (id: number) => {
    // TODO: 實現交換請求邏輯
    console.log('Exchange request for photocard:', id);
    // 這裡可以打開模態框選擇要交換的小卡
  };

  // 載入中狀態
  const LoadingSkeleton = () => (
    <div className="masonry-grid">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="masonry-item">
          <div className="rounded-xl overflow-hidden bg-card/50 animate-pulse">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 篩選側邊欄 */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* 主要內容區域 */}
          <div className="flex-1">
            {/* 標題和統計 */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold neon-text mb-2">
                    探索小卡
                  </h1>
                  <p className="text-muted-foreground">
                    發現和交換來自 NEVERLAND 社群的珍貴小卡
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadPhotocards}
                  disabled={loading}
                  className="hover:bg-primary/10"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  重新載入
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div>
                  總共 <span className="text-foreground font-semibold">{photocards.length}</span> 張小卡
                </div>
                <div>
                  顯示 <span className="text-foreground font-semibold">{filteredPhotocards.length}</span> 張結果
                </div>
                {favorites.size > 0 && (
                  <div>
                    收藏 <span className="text-red-500 font-semibold">{favorites.size}</span> 張
                  </div>
                )}
              </div>
            </div>

            {/* 錯誤狀態 */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={loadPhotocards} className="neon-button">
                  重試
                </Button>
              </div>
            )}

            {/* 載入中狀態 */}
            {loading && <LoadingSkeleton />}

            {/* 小卡網格 */}
            {!loading && !error && (
              <>
                {filteredPhotocards.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      {filters.members.length > 0 || filters.albums.length > 0 || filters.rarity.length > 0
                        ? '沒有找到符合條件的小卡'
                        : '目前沒有小卡'}
                    </p>
                    {(filters.members.length > 0 || filters.albums.length > 0 || filters.rarity.length > 0) && (
                      <Button 
                        variant="outline" 
                        onClick={() => setFilters({ members: [], albums: [], rarity: [] })}
                      >
                        清除所有篩選
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="masonry-grid">
                    {filteredPhotocards.map((photocard, index) => (
                      <PhotocardItem
                        key={photocard.id}
                        photocard={photocard}
                        onToggleFavorite={handleToggleFavorite}
                        onRequestExchange={handleRequestExchange}
                        isFavorite={favorites.has(photocard.id)}
                        className={`animate-fade-in-up opacity-0`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'forwards'
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
