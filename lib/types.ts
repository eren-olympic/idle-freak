export type MemberName = 'Miyeon' | 'Minnie' | 'Soyeon' | 'Yuqi' | 'Shuhua';

export type RarityLevel = 'normal' | 'rare' | 'super_rare';

export interface PhotocardMember {
  id: MemberName;
  name: string;
  color: string;
}

export interface Photocard {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  member: MemberName;
  album?: string;
  version?: string;
  release_year?: number;
  rarity: RarityLevel;
  owner_preferences?: {
    wanted_members?: MemberName[];
    wanted_albums?: string[];
  };
  uploaded_by?: string;
  uploaded_at?: string;
}

export interface FilterOptions {
  members: MemberName[];
  albums: string[];
  rarity: RarityLevel[];
}

export const MEMBERS: Record<MemberName, PhotocardMember> = {
  'Miyeon': { id: 'Miyeon', name: 'Miyeon', color: '#FF6B9D' }, // 粉紅色
  'Minnie': { id: 'Minnie', name: 'Minnie', color: '#10B981' }, // 薄荷綠
  'Soyeon': { id: 'Soyeon', name: 'Soyeon', color: '#F59E0B' }, // 黃色
  'Yuqi': { id: 'Yuqi', name: 'Yuqi', color: '#8B5CF6' }, // 紫色
  'Shuhua': { id: 'Shuhua', name: 'Shuhua', color: '#3B82F6' }, // 天藍色
};

export const RARITY_LEVELS: Record<RarityLevel, { label: string; stars: number; color: string }> = {
  'normal': { label: '普通', stars: 1, color: '#9CA3AF' },
  'rare': { label: '稀有', stars: 2, color: '#F59E0B' },
  'super_rare': { label: '超稀有', stars: 3, color: '#EF4444' },
};