'use client';

import { useState } from 'react';
import { X, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { FilterOptions, MEMBERS, RARITY_LEVELS, MemberName, RarityLevel } from '@/lib/types';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableAlbums?: string[];
  className?: string;
}

export function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  availableAlbums = ['I NEVER DIE', 'I LOVE', 'I FEEL', 'I WANT', 'TOMBOY'], 
  className 
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMember = (member: MemberName) => {
    const newMembers = filters.members.includes(member)
      ? filters.members.filter(m => m !== member)
      : [...filters.members, member];
    onFiltersChange({ ...filters, members: newMembers });
  };

  const toggleAlbum = (album: string) => {
    const newAlbums = filters.albums.includes(album)
      ? filters.albums.filter(a => a !== album)
      : [...filters.albums, album];
    onFiltersChange({ ...filters, albums: newAlbums });
  };

  const toggleRarity = (rarity: RarityLevel) => {
    const newRarities = filters.rarity.includes(rarity)
      ? filters.rarity.filter(r => r !== rarity)
      : [...filters.rarity, rarity];
    onFiltersChange({ ...filters, rarity: newRarities });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      members: [],
      albums: [],
      rarity: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters.members.length + filters.albums.length + filters.rarity.length;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold neon-text">篩選小卡</h2>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-accent"
          >
            清除全部
          </Button>
        )}
      </div>

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">已選擇的篩選條件：</p>
          <div className="flex flex-wrap gap-2">
            {filters.members.map(member => (
              <Badge
                key={member}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive"
                style={{ backgroundColor: MEMBERS[member].color + '20', borderColor: MEMBERS[member].color }}
                onClick={() => toggleMember(member)}
              >
                {MEMBERS[member].name}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            {filters.albums.map(album => (
              <Badge
                key={album}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive"
                onClick={() => toggleAlbum(album)}
              >
                {album}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            {filters.rarity.map(rarity => (
              <Badge
                key={rarity}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive"
                onClick={() => toggleRarity(rarity)}
              >
                {RARITY_LEVELS[rarity].label}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Members Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">成員</h3>
        <div className="space-y-2">
          {Object.values(MEMBERS).map((member) => (
            <div key={member.id} className="flex items-center space-x-3">
              <Checkbox
                id={`member-${member.id}`}
                checked={filters.members.includes(member.id)}
                onCheckedChange={() => toggleMember(member.id)}
                className="border-border"
              />
              <label
                htmlFor={`member-${member.id}`}
                className="flex items-center space-x-2 cursor-pointer flex-1"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: member.color }}
                />
                <span className="text-sm font-medium">{member.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Albums Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">專輯</h3>
        <div className="space-y-2">
          {availableAlbums.map((album) => (
            <div key={album} className="flex items-center space-x-3">
              <Checkbox
                id={`album-${album}`}
                checked={filters.albums.includes(album)}
                onCheckedChange={() => toggleAlbum(album)}
              />
              <label
                htmlFor={`album-${album}`}
                className="text-sm cursor-pointer flex-1"
              >
                {album}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rarity Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">稀有度</h3>
        <div className="space-y-2">
          {Object.entries(RARITY_LEVELS).map(([key, rarity]) => (
            <div key={key} className="flex items-center space-x-3">
              <Checkbox
                id={`rarity-${key}`}
                checked={filters.rarity.includes(key as RarityLevel)}
                onCheckedChange={() => toggleRarity(key as RarityLevel)}
              />
              <label
                htmlFor={`rarity-${key}`}
                className="flex items-center space-x-2 cursor-pointer flex-1"
              >
                <div className="flex items-center">
                  {Array.from({ length: rarity.stars }).map((_, index) => (
                    <Star key={index} className="h-3 w-3 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm">{rarity.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <div className="sticky top-20 w-64 p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
          <ScrollArea className="h-[calc(100vh-120px)]">
            <FilterContent />
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-20 right-4 z-40 neon-button"
            >
              <Filter className="h-4 w-4 mr-2" />
              篩選
              {getActiveFiltersCount() > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="neon-text">篩選小卡</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ScrollArea className="h-[calc(100vh-120px)]">
                <FilterContent />
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}