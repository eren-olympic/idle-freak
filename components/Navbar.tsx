'use client';

import { useState } from 'react';
import { Bell, Heart, Upload, Home, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigationItems = [
  { label: '首頁', href: '/', icon: Home },
  { label: '探索小卡', href: '/explore', icon: Search },
  { label: '我的收藏', href: '/collection', icon: Heart },
  { label: '交換請求', href: '/exchanges', icon: Bell },
  { label: '上傳小卡', href: '/upload', icon: Upload },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notificationCount = 3; // 模擬通知數量

  return (
    <nav className="neon-nav sticky top-0 z-50 w-full px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold neon-text">
            idle-freak
          </div>
          <div className="hidden text-xs text-muted-foreground sm:block">
            by NEVERLAND
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 md:flex">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className="relative flex items-center space-x-2 text-white hover:bg-white/10 hover:text-accent transition-all duration-200"
                asChild
              >
                <a href={item.href}>
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                  {item.href === '/exchanges' && notificationCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs animate-pulse"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </a>
              </Button>
            );
          })}
        </div>

        {/* Right Side - User Menu & Notifications */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10 hover:text-accent transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs animate-pulse"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/user-avatar.jpg" alt="用戶頭像" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    NL
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">NEVERLAND</p>
                <p className="text-xs leading-none text-muted-foreground">
                  neverland@idle.com
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                個人檔案
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                收藏夾
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-400">
                登出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between pb-4">
                <div className="text-lg font-bold neon-text">選單</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="relative justify-start space-x-3 h-12"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <a href={item.href}>
                        <IconComponent className="h-5 w-5" />
                        <span>{item.label}</span>
                        {item.href === '/exchanges' && notificationCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="ml-auto h-5 w-5 rounded-full p-0 text-xs"
                          >
                            {notificationCount}
                          </Badge>
                        )}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}