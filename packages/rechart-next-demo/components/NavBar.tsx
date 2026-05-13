import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-950">
          BI
        </span>
        <div>
          <p className="text-sm font-semibold leading-5">Business Intelligence</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recharts Analytics
          </p>
        </div>
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-9 w-9">
              <AvatarImage src="" />
              <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                DC
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>账户中心</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">个人资料</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/login">退出登录</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;  
