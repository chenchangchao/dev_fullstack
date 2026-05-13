import {
  Command,
  // CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import {
  CircleGauge,
  Receipt,
  FunnelPlus,
  ScrollText,
  CircleArrowRight,
  BookOpenCheck,
} from "lucide-react";

type SideBarProps = {
  className?: string;
};
const SideBar = ({ className }: SideBarProps) => {
  return (
    <div className={className}>
      <Command className="h-full rounded-none border-0 bg-transparent">
        <div className="p-3">
          <CommandInput placeholder="搜索模块..." />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="业务概况">
            <CommandItem className="gap-2">
              <CircleGauge className="mr-2 h-4 w-4" />
              <Link href="/">大盘趋势</Link>
            </CommandItem>
            <CommandItem className="gap-2">
              <Receipt className="mr-2 h-4 w-4" />
              <Link href="/advertising">推广效费</Link>
            </CommandItem>
            <CommandItem className="gap-2">
              <FunnelPlus className="mr-2 h-4 w-4" />
              <Link href="/conversion">流量转化</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="关于我们">
            <CommandItem className="gap-2">
              <BookOpenCheck className="mr-2 h-4 w-4" />
              <span>更新日志</span>
            </CommandItem>
            <CommandItem className="gap-2">
              <ScrollText className="mr-2 h-4 w-4" />
              <span>用户手册</span>
            </CommandItem>
            <CommandItem className="gap-2">
              <CircleArrowRight className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default SideBar;
