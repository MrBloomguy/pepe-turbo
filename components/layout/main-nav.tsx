"use client"

import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { LinkComponent } from "../shared/link-component"
import { WalletConnect } from "@/components/blockchain/wallet-connect"

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LightDarkImage
          LightImage="/logo-dark.png"
          DarkImage="/logo-light.png"
          alt="frens.bet"
          className="rounded-full"
          height={32}
          width={32}
        />
        <span className="hidden bg-gradient-to-br from-black to-stone-500 bg-clip-text text-2xl font-bold text-transparent dark:from-stone-100 dark:to-yellow-200 sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-base font-medium">
        <MainNavMenu />
      </nav>
      <div className="ml-auto">
        <WalletConnect />
      </div>
    </div>
  )
}

function MainNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <NavMenuListItem 
                name="Projects" 
                href="/explore/projects" 
                description="Discover new and trending projects"
                iconLight="/icons/projects-light.svg"
                iconDark="/icons/projects-dark.svg"
              />
              <NavMenuListItem 
                name="Trending" 
                href="/explore/trending" 
                description="Most popular and active communities"
                iconLight="/icons/trending-light.svg"
                iconDark="/icons/trending-dark.svg"
              />
              <NavMenuListItem 
                name="Categories" 
                href="/explore/categories" 
                description="Browse projects by category"
                iconLight="/icons/categories-light.svg"
                iconDark="/icons/categories-dark.svg"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <LinkComponent href="/ranks">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span>Ranks</span>
            </NavigationMenuLink>
          </LinkComponent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Activities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <NavMenuListItem 
                name="Recent" 
                href="/activities/recent" 
                description="Latest community activities"
                iconLight="/icons/recent-light.svg"
                iconDark="/icons/recent-dark.svg"
              />
              <NavMenuListItem 
                name="Your Feed" 
                href="/activities/feed" 
                description="Personalized activity stream"
                iconLight="/icons/feed-light.svg"
                iconDark="/icons/feed-dark.svg"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <LinkComponent href="/notifications">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span>Notifications</span>
            </NavigationMenuLink>
          </LinkComponent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface NavMenuListItemProps {
  name: string
  description: string
  href: string
  iconLight: string
  iconDark: string
}

const NavMenuListItem = ({
  name,
  description,
  href,
  iconLight,
  iconDark,
}: NavMenuListItemProps) => {
  return (
    <li className="w-full min-w-full" key={name}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="flex select-none flex-col gap-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center gap-x-2">
            <LightDarkImage
              LightImage={iconLight}
              DarkImage={iconDark}
              alt="icon"
              height={24}
              width={24}
              className="h-6 w-6"
            />
            <span className="text-base font-medium leading-none">{name}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export default MainNav