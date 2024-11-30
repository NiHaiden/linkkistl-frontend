'use client';

import * as React from 'react';
import {
   ArrowDown,
   ArrowUp,
   ArrowUpRight,
   AudioWaveform,
   Bell,
   Blocks,
   Calendar,
   ChevronRight,
   Command,
   Copy,
   CornerUpLeft,
   CornerUpRight,
   FileText,
   GalleryVerticalEnd,
   Home,
   Inbox,
   LineChart,
   Link,
   type LucideIcon,
   MessageCircleQuestion,
   MoreHorizontal,
   Plus,
   Search,
   Settings2,
   Sparkles,
   Star,
   StarOff,
   Trash,
   Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarInset,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuBadge,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   SidebarProvider,
   SidebarRail,
   SidebarTrigger,
   useSidebar,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { AnimatedSettingsIcon } from '@/components/icons/animated-settings';
import { ReactNode } from 'react';
// This is sample data.
const data = {
   teams: [
      {
         name: 'Acme Inc',
         logo: Command,
         plan: 'Enterprise',
      },
      {
         name: 'Acme Corp.',
         logo: AudioWaveform,
         plan: 'Startup',
      },
      {
         name: 'Evil Corp.',
         logo: Command,
         plan: 'Free',
      },
   ],
   navMain: [
      {
         title: 'Search',
         url: '#',
         icon: Search,
      },
      {
         title: 'Ask AI',
         url: '#',
         icon: Sparkles,
      },
      {
         title: 'Home',
         url: '#',
         icon: Home,
         isActive: true,
      },
      {
         title: 'Inbox',
         url: '#',
         icon: Inbox,
         badge: '10',
      },
   ],
   navSecondary: [
      {
         title: 'Calendar',
         url: '#',
         icon: Calendar,
      },
      {
         title: 'Settings',
         url: '/dashboard/settings',
         icon: AnimatedSettingsIcon,
      },
      {
         title: 'Templates',
         url: '#',
         icon: Blocks,
      },
      {
         title: 'Trash',
         url: '#',
         icon: Trash2,
      },
      {
         title: 'Help',
         url: '#',
         icon: MessageCircleQuestion,
      },
   ],
   favorites: [
      {
         name: 'Project Management & Task Tracking',
         url: '#',
         emoji: '📊',
      },
      {
         name: 'Family Recipe Collection & Meal Planning',
         url: '#',
         emoji: '🍳',
      },
      {
         name: 'Fitness Tracker & Workout Routines',
         url: '#',
         emoji: '💪',
      },
      {
         name: 'Book Notes & Reading List',
         url: '#',
         emoji: '📚',
      },
      {
         name: 'Sustainable Gardening Tips & Plant Care',
         url: '#',
         emoji: '🌱',
      },
      {
         name: 'Language Learning Progress & Resources',
         url: '#',
         emoji: '🗣️',
      },
      {
         name: 'Home Renovation Ideas & Budget Tracker',
         url: '#',
         emoji: '🏠',
      },
      {
         name: 'Personal Finance & Investment Portfolio',
         url: '#',
         emoji: '💰',
      },
      {
         name: 'Movie & TV Show Watchlist with Reviews',
         url: '#',
         emoji: '🎬',
      },
      {
         name: 'Daily Habit Tracker & Goal Setting',
         url: '#',
         emoji: '✅',
      },
   ],
   actions: [
      [
         {
            label: 'Customize Page',
            icon: Settings2,
         },
         {
            label: 'Turn into wiki',
            icon: FileText,
         },
      ],
      [
         {
            label: 'Copy Link',
            icon: Link,
         },
         {
            label: 'Duplicate',
            icon: Copy,
         },
         {
            label: 'Move to',
            icon: CornerUpRight,
         },
         {
            label: 'Move to Trash',
            icon: Trash2,
         },
      ],
      [
         {
            label: 'Undo',
            icon: CornerUpLeft,
         },
         {
            label: 'View analytics',
            icon: LineChart,
         },
         {
            label: 'Version History',
            icon: GalleryVerticalEnd,
         },
         {
            label: 'Show delete pages',
            icon: Trash,
         },
         {
            label: 'Notifications',
            icon: Bell,
         },
      ],
      [
         {
            label: 'Import',
            icon: ArrowUp,
         },
         {
            label: 'Export',
            icon: ArrowDown,
         },
      ],
   ],
};

export default function SidebarPage({ children }: { children: ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2">
               <div className="flex flex-1 items-center gap-2 px-3">
                  <SidebarTrigger />


               </div>
               <div className="ml-auto px-3">

               </div>
            </header>
            <div className="flex flex-1 flex-col p-4">
               <div className={'flex flex-grow flex-col items-start'}>{children}</div>
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar className="border-r-0" {...props}>
         <SidebarHeader>
            <NavMain items={data.navMain} />
         </SidebarHeader>
         <SidebarContent>

            <NavSecondary items={data.navSecondary} className="mt-auto" />
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   );
}

function NavActions({
                       actions,
                    }: {
   actions: {
      label: string
      icon: LucideIcon
   }[][]
}) {
   const [isOpen, setIsOpen] = React.useState(false);

   React.useEffect(() => {
      setIsOpen(true);
   }, []);

   return (
      <div className="flex items-center gap-2 text-sm">
         <div className="hidden font-medium text-muted-foreground md:inline-block">
            Edit Oct 08
         </div>
         <Button variant="ghost" size="icon" className="h-7 w-7">
            <Star />
         </Button>
         <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 data-[state=open]:bg-accent"
               >
                  <MoreHorizontal />
               </Button>
            </PopoverTrigger>
            <PopoverContent
               className="w-56 overflow-hidden rounded-lg p-0"
               align="end"
            >
               <Sidebar collapsible="none" className="bg-transparent">
                  <SidebarContent>
                     {actions.map((group, index) => (
                        <SidebarGroup key={index} className="border-b last:border-none">
                           <SidebarGroupContent className="gap-0">
                              <SidebarMenu>
                                 {group.map((item, index) => (
                                    <SidebarMenuItem key={index}>
                                       <SidebarMenuButton>
                                          <item.icon />
                                          <span>{item.label}</span>
                                       </SidebarMenuButton>
                                    </SidebarMenuItem>
                                 ))}
                              </SidebarMenu>
                           </SidebarGroupContent>
                        </SidebarGroup>
                     ))}
                  </SidebarContent>
               </Sidebar>
            </PopoverContent>
         </Popover>
      </div>
   );
}

function NavMain({
                    items,
                 }: {
   items: {
      title: string
      url: string
      icon: LucideIcon
      isActive?: boolean
   }[]
}) {
   return (
      <SidebarMenu>
         {items.map((item) => (
            <SidebarMenuItem key={item.title}>
               <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.url}>
                     <item.icon />
                     <span>{item.title}</span>
                  </a>
               </SidebarMenuButton>
            </SidebarMenuItem>
         ))}
      </SidebarMenu>
   );
}

function NavSecondary({
                         items,
                         ...props
                      }: {
   items: {
      title: string
      url: string
      icon: LucideIcon
      badge?: React.ReactNode
   }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
   return (
      <SidebarGroup {...props}>
         <SidebarGroupContent>
            <SidebarMenu>
               {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild>
                        <a href={item.url}>
                           <item.icon />
                           <span>{item.title}</span>
                        </a>
                     </SidebarMenuButton>
                     {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
}

function NavWorkspaces({
                          workspaces,
                       }: {
   workspaces: {
      name: string
      emoji: React.ReactNode
      pages: {
         name: string
         emoji: React.ReactNode
      }[]
   }[]
}) {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
         <SidebarGroupContent>
            <SidebarMenu>
               {workspaces.map((workspace) => (
                  <Collapsible key={workspace.name}>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                           <a href="#">
                              <span>{workspace.emoji}</span>
                              <span>{workspace.name}</span>
                           </a>
                        </SidebarMenuButton>
                        <CollapsibleTrigger asChild>
                           <SidebarMenuAction
                              className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                              showOnHover
                           >
                              <ChevronRight />
                           </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <SidebarMenuAction showOnHover>
                           <Plus />
                        </SidebarMenuAction>
                        <CollapsibleContent>
                           <SidebarMenuSub>
                              {workspace.pages.map((page) => (
                                 <SidebarMenuSubItem key={page.name}>
                                    <SidebarMenuSubButton asChild>
                                       <a href="#">
                                          <span>{page.emoji}</span>
                                          <span>{page.name}</span>
                                       </a>
                                    </SidebarMenuSubButton>
                                 </SidebarMenuSubItem>
                              ))}
                           </SidebarMenuSub>
                        </CollapsibleContent>
                     </SidebarMenuItem>
                  </Collapsible>
               ))}
               <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground/70">
                     <MoreHorizontal />
                     <span>More</span>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
}
