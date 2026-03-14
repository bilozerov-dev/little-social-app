import prisma from "@/lib/prisma/prisma";
import { buttonVariants } from "@/ui/button";
import classNames from "@/utils/classNames";
import { Mails } from "lucide-react";
import Link from "next/link";

export default function ChatsButton() {
  prisma.message.findMany({
    cursor: { id: "" },
  });
  return (
    <Link
      className={classNames(
        buttonVariants({ variant: "ghost", size: "icon-sm" })
      )}
      href="/chat"
    >
      <Mails />
    </Link>
  );
}
