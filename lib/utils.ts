import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Photocard, MemberName, RarityLevel } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ProductData {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

// 成員名稱列表，用於隨機分配
const memberNames: MemberName[] = ['Miyeon', 'Minnie', 'Soyeon', 'Yuqi', 'Shuhua'];
const rarityLevels: RarityLevel[] = ['normal', 'rare', 'super_rare'];
const albums = ['I NEVER DIE', 'I LOVE', 'I FEEL', 'I WANT', 'TOMBOY'];
const versions = ['Standard', 'Limited', 'Special', 'Collector'];
const uploaders = ['NEVERLAND_김민', 'idle_collector_jp', 'soyeon_stan', 'gidle_trade_kr', 'yuqi_bias'];

// 將產品數據轉換為小卡格式
export function convertProductToPhotocard(product: ProductData): Photocard {
  // 使用產品ID來確保一致的隨機分配
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  const memberIndex = Math.floor(random(product.id * 2) * memberNames.length);
  const rarityIndex = Math.floor(random(product.id * 3) * rarityLevels.length);
  const albumIndex = Math.floor(random(product.id * 5) * albums.length);
  const versionIndex = Math.floor(random(product.id * 7) * versions.length);
  const uploaderIndex = Math.floor(random(product.id * 11) * uploaders.length);
  
  const member = memberNames[memberIndex];
  const rarity = rarityLevels[rarityIndex];
  
  // 生成想要的成員偏好
  const wantedMembers = memberNames.filter(m => m !== member && random(product.id * 13 + memberNames.indexOf(m)) > 0.6);
  
  return {
    id: product.id,
    name: `${member} ${product.name.replace(/經典|極簡|復古|北歐|手工/, '')}`,
    price_in_cents: product.price_in_cents,
    image_url: product.image_url,
    member,
    album: albums[albumIndex],
    version: versions[versionIndex],
    release_year: 2022 + Math.floor(random(product.id * 17) * 3),
    rarity,
    owner_preferences: {
      wanted_members: wantedMembers.length > 0 ? wantedMembers : undefined,
      wanted_albums: random(product.id * 19) > 0.7 ? [albums[(albumIndex + 1) % albums.length]] : undefined
    },
    uploaded_by: uploaders[uploaderIndex],
    uploaded_at: getRelativeTime(Math.floor(random(product.id * 23) * 30))
  };
}

// 獲取相對時間字符串
function getRelativeTime(daysAgo: number): string {
  if (daysAgo === 0) return '剛剛';
  if (daysAgo === 1) return '1天前';
  if (daysAgo < 7) return `${daysAgo}天前`;
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)}週前`;
  return `${Math.floor(daysAgo / 30)}個月前`;
}

// 格式化價格
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// 篩選小卡
export function filterPhotocards(
  photocards: Photocard[],
  filters: {
    members: MemberName[];
    albums: string[];
    rarity: RarityLevel[];
  }
): Photocard[] {
  return photocards.filter(card => {
    // 成員篩選
    if (filters.members.length > 0 && !filters.members.includes(card.member)) {
      return false;
    }
    
    // 專輯篩選
    if (filters.albums.length > 0 && card.album && !filters.albums.includes(card.album)) {
      return false;
    }
    
    // 稀有度篩選
    if (filters.rarity.length > 0 && !filters.rarity.includes(card.rarity)) {
      return false;
    }
    
    return true;
  });
}
