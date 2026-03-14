import { Message } from "@/ui/types/Message";
import { Button } from "@/ui/button";
import classNames from "@/utils/classNames";

type Props = {
  className?: string;
  messages: Message[];
};

export function ChatView({ className }: Props) {
  return (
    <div
      className={classNames(
        className,
        "flex flex-col relative bg-opacity-35"
      )}
    >
      <div className="flex-shrink-0 h-20 border-b border-b-neutral-400"></div>
      <div className="grow h-full"></div>
      <div className="flex-shrink-0 h-20 border border-input shadow-xs rounded">
      
      <div className="flex p-3 w-full items-center space-x-1.5">
        <Button type="button">Subscribe</Button>
      </div>
      
      </div>
    </div>
  );
}
