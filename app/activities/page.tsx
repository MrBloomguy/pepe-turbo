"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  integrationCategories,
  turboIntegrations,
} from "@/data/turbo-integrations"
import { LuMenu } from "react-icons/lu"

import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { LinkComponent } from "@/components/shared/link-component"
import { ModeToggle } from "@/components/shared/mode-toggle"
import styles from "@/styles/Activities.module.css"

// MobileLink component
function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

// NavMenuListItem for mobile
const MobileNavMenuListItem = ({
  name,
  href,
  lightImage,
  darkImage,
  onOpenChange,
}: {
  name: string
  href: string
  lightImage: string
  darkImage: string
  onOpenChange?: (open: boolean) => void
}) => {
  return (
    <li key={name}>
      <MobileLink
        onOpenChange={onOpenChange}
        href={href}
        className="block select-none space-y-1 rounded-md py-3 pl-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="flex items-center space-x-2">
          <LightDarkImage
            LightImage={lightImage}
            DarkImage={darkImage}
            alt="icon"
            height={16}
            width={16}
            className="h-4 w-4"
          />
          <span className="text-sm font-medium leading-none">{name}</span>
        </div>
      </MobileLink>
    </li>
  )
}

// Main Navigation Component
function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LightDarkImage
          LightImage="/logo-dark.png"
          DarkImage="/logo-light.png"
          alt={siteConfig.name}
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

// Main Navigation Menu
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

// Navigation Menu List Item
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

export default function Activities() {
  const [open, setOpen] = useState(false)
  const [activeProfile, setActiveProfile] = useState(null)

  const activities = [
    {
      id: 1,
      challenger: "CryptoKing",
      opponent: "BetMaster",
      challenge: "World Cup Final Winner",
      date: "2024-03-20",
      time: "14:00",
      volume: "5,000 USDT",
    },
    {
      id: 2,
      challenger: "TraderPro",
      opponent: "CryptoNinja",
      challenge: "BTC reaches 100k",
      date: "2024-04-15",
      time: "16:00",
      volume: "10,000 USDT",
    },
    {
      id: 3,
      challenger: "SolWarrior",
      opponent: "ChainMaster",
      challenge: "SOL to hit $500",
      date: "2024-05-01",
      time: "12:00",
      volume: "2,500 USDT",
    },
    {
      id: 4,
      challenger: "PolyKing",
      opponent: "ScalingPro",
      challenge: "Daily TX over 100M",
      date: "2024-06-10",
      time: "15:30",
      volume: "7,500 USDT",
    },
    {
      id: 5,
      challenger: "EtherWhale",
      opponent: "GasTracker",
      challenge: "Gas below 20 gwei",
      date: "2024-07-20",
      time: "09:45",
      volume: "15,000 USDT",
    },
  ]

  return (
    <div className={styles.pageContainer}>
      {/* Mobile Navigation for small screens */}
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LightDarkImage
              LightImage="/logo-dark.png"
              DarkImage="/logo-light.png"
              alt="frens.bet"
              className="rounded-full"
              height={32}
              width={32}
            />
            <span className="inline-block bg-gradient-to-br from-black to-stone-500 bg-clip-text text-xl font-bold text-transparent dark:from-stone-100 dark:to-yellow-200 sm:text-2xl">
              {siteConfig.name}
            </span>
          </Link>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="ml-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <LuMenu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="right" className="pr-0">
          <div className="flex items-center gap-x-4">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setOpen}
            >
              <LightDarkImage
                LightImage="/logo-dark.png"
                DarkImage="/logo-light.png"
                alt="frens.bet"
                height={32}
                width={32}
              />
            </MobileLink>
            <ModeToggle />
          </div>
          <ScrollArea className="my-4 mr-4 h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col space-y-4">
              <WalletConnect />
              <Accordion type="single" collapsible className="mx-auto w-full">
                <AccordionItem value="integrations">
                  <AccordionTrigger className="text-base font-medium">
                    Integrations
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2">
                      {integrationCategories.map((category) => (
                        <>
                          <h4 className="text-sm font-medium leading-none">
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </h4>
                          <Separator className="col-span-3" />
                          {Object.values(turboIntegrations)
                            .filter(
                              (integration) => integration.category === category
                            )
                            .map(({ name, href, imgDark, imgLight }) => (
                              <MobileNavMenuListItem
                                key={name}
                                name={name}
                                href={href}
                                lightImage={imgDark}
                                darkImage={imgLight}
                                onOpenChange={setOpen}
                              />
                            ))}
                        </>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dashboard">
                  <AccordionTrigger className="text-base font-medium">
                    Dashboard
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {menuDashboard?.map((item, index) =>
                        item.href ? (
                          <Link
                            key={index}
                            href={item.href}
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <div
                            key={index}
                            className="text-muted-foreground/70 transition-colors"
                          >
                            {item.label}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <WalletConnect />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Navigation for larger screens */}
      <MainNav />

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Challenge</th>
                  <th>Date</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className={styles.challengeRow}>
                    <td>
                      <div className={styles.usersCell}>
                        <div className={styles.avatarStack}>
                          <div className={styles.avatarTop}></div>
                          <div className={styles.avatarBottom}></div>
                        </div>
                        <div className={styles.userNames}>
                          <span className={styles.challenger}>
                            {activity.challenger}
                          </span>
                          <span> vs </span>
                          <span className={styles.opponent}>
                            {activity.opponent}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.challengeCell}>
                        {activity.challenge}
                      </div>
                    </td>
                    <td>
                      <div className={styles.dateCell}>
                        <div className={styles.dateInfo}>
                          <span>{activity.date}</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.volumeCell}>{activity.volume}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
