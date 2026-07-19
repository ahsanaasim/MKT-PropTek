"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Mic,
  Paperclip,
  Pencil,
  Send,
  Trash2,
} from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { StateBanners } from "@/components/states/status-banners";
import { EmptyState } from "@/components/states/empty-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatDate,
  getChatForJob,
  getJob,
} from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import type { ChatMessage, User, UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function JobChatScreen({
  jobId,
  role,
  user,
}: {
  jobId: string;
  role: UserRole;
  user: User;
}) {
  const { setState } = useScreenState();
  const { data, state } = useAsyncData(
    () => ({
      job: getJob(jobId),
      messages: getChatForJob(jobId),
    }),
    [jobId],
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.messages) setMessages(data.messages);
  }, [data]);

  const job = data?.job;
  const base = role === "poster" ? "/poster" : "/team";

  function send() {
    if (!text.trim() || !job) return;
    if (editingId) {
      setMessages((ms) =>
        ms.map((m) =>
          m.id === editingId ? { ...m, text, edited: true } : m,
        ),
      );
      setEditingId(null);
    } else {
      setMessages((ms) => [
        ...ms,
        {
          id: `local-${Date.now()}`,
          jobId: job.id,
          senderId: user.id,
          senderName: user.name,
          senderAvatar: user.avatar,
          role,
          text,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setText("");
  }

  return (
    <MobileShell role={role} user={user} showTopBar={false} showBottomNav>
      <div className="flex min-h-[70dvh] flex-col gap-3">
        <div className="flex items-center gap-2">
          <LinkButton variant="ghost" size="icon" className="rounded-md" href={`${base}/job/${jobId}`}><ChevronLeft className="size-5" /></LinkButton>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-[family-name:var(--font-display)] font-semibold">
              {job?.title || "Job chat"}
            </h1>
            <div className="flex -space-x-2">
              <Avatar className="size-6 border-2 border-white">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Avatar className="size-6 border-2 border-white">
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <StateBanners state={state} onRetry={() => setState("ready")} />

        {state === "loading" ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-3/4 rounded-lg" />
            <Skeleton className="ms-auto h-16 w-2/3 rounded-lg" />
          </div>
        ) : null}

        {state === "empty" || (state === "ready" && messages.length === 0) ? (
          <EmptyState
            title="No messages yet"
            description="Say hello and align on access, photos, and timing."
          />
        ) : null}

        {(state === "ready" || state === "plan_limit") && (
          <div className="flex flex-1 flex-col gap-3">
            {messages.map((m) => {
              const mine = m.senderId === user.id;
              return (
                <div
                  key={m.id}
                  className={cn("flex gap-2", mine && "flex-row-reverse")}
                >
                  <Avatar className="size-8">
                    <AvatarImage src={m.senderAvatar} />
                    <AvatarFallback>{m.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm",
                      mine
                        ? "bg-primary text-primary-foreground"
                        : "border bg-white",
                    )}
                  >
                    <p>{m.text}</p>
                    {m.attachment ? (
                      <div className="relative mt-2 aspect-video overflow-hidden rounded-md">
                        {m.attachment.type === "jpg" ? (
                          <Image
                            src={m.attachment.url}
                            alt={m.attachment.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-20 items-center justify-center bg-muted text-xs">
                            {m.attachment.name}
                          </div>
                        )}
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        "mt-1 flex items-center gap-2 text-[10px]",
                        mine ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      <span>{formatDate(m.timestamp)}</span>
                      {m.edited ? <span>edited</span> : null}
                      {mine ? (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(m.id);
                            setText(m.text);
                          }}
                          aria-label="Edit message"
                        >
                          <Pencil className="size-3" />
                        </button>
                      ) : null}
                      {role === "poster" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMessages((ms) => ms.filter((x) => x.id !== m.id));
                            toast.message("Message deleted");
                          }}
                          aria-label="Delete message"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="sticky bottom-20 flex items-center gap-2 rounded-lg border bg-white p-2 shadow-sm">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-md"
            onClick={() => toast.message("Attachment ready (demo)")}
          >
            <Paperclip className="size-4" />
          </Button>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message…"
            className="h-10 rounded-md border-0 shadow-none focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <Button
            size="icon"
            variant="ghost"
            className="rounded-md"
            onClick={() => toast.message("Voice-to-text (demo)")}
          >
            <Mic className="size-4" />
          </Button>
          <Button size="icon" className="rounded-md" onClick={send}>
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </MobileShell>
  );
}
