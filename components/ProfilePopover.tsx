"use client";

import {motion} from "framer-motion";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {LogOut, ShoppingBag, User} from "lucide-react";
import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useTranslations} from "next-intl";
import ClickSpark from "@/components/ClickSpark";

const ProfilePopover = () => {
  const {customer, logout} = useAuth();
  const router = useRouter();
  const t = useTranslations("profilePopover");

  if (!customer) return null;

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 hover:bg-accent rounded-full transition-colors px-3"
          aria-label={t("openMenu")}
        >
          <Avatar className="h-7 w-7">
            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-60 p-2 shadow-lg border rounded-xl"
        align="end"
      >
        <ClickSpark
          sparkColor='blue'
          sparkSize={10}
          sparkRadius={30}
          sparkCount={8}
          duration={800}
        >
          <motion.div
            initial={{opacity: 0, y: -5}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2, ease: "easeOut"}}
            className="flex flex-col space-y-2"
          >
            {/* User Info Header */}
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-semibold">{customer.name}</p>
              {customer.email && (
                <p className="text-xs text-muted-foreground">{customer.email}</p>
              )}
            </div>

            {/* Links */}
            <Link
              href="/auth/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <User className="h-4 w-4"/>
              <span>{t("profile")}</span>
            </Link>

            <Link
              href="/auth/orders"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingBag className="h-4 w-4"/>
              <span>{t("orders")}</span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 justify-start px-3 py-2 rounded-md text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="h-4 w-4"/>
              <span>{t("logout")}</span>
            </Button>
          </motion.div>
        </ClickSpark>

      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
