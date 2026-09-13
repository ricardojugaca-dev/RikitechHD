"use client";

import { useState } from "react";
import TelegramFeed from "./TelegramFeed";

interface TelegramWidgetProps {
  apiUrl: string;
  channelUsername: string;
  channelName: string;
  joinUrl: string;
}

export default function TelegramWidget({
  apiUrl,
  channelUsername,
  channelName,
  joinUrl,
}: TelegramWidgetProps) {
  const [subscribers, setSubscribers] = useState<string>("...");

  return (
    <div className="overflow-hidden rounded-xs border border-border bg-card shadow-lg">
      {/* Header tipo Telegram */}
      <div className="flex items-center justify-between border-b border-border bg-card p-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#2481cc] to-[#1d6fa5] flex items-center justify-center text-white shadow-md shrink-0">
            <TelegramIcon className="h-5 w-5 fill-white" />
          </div>
          <div className="min-w-0">
            <h5 className="text-[12.5px] font-bold text-card-foreground truncate">
                {channelName}
                </h5>
                <span className="text-[10.5px] text-muted">
                {subscribers}
                </span>
          </div>
        </div>
        <a
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-[#2481cc] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#1d6fa5] transition shrink-0"
        >
          JOIN
        </a>
      </div>

      {/* Feed */}
      <TelegramFeed
        apiUrl={apiUrl}
        channelUsername={channelUsername}
        onSubscribersLoaded={setSubscribers}
      />
    </div>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.29c-.15.66-.54.82-1.09.51l-3.02-2.23-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.34-.38-.13l-6.93 4.36-2.98-.93c-.65-.2-.66-.65.14-.96l11.66-4.49c.54-.2 1.01.13.82 1.02z" />
    </svg>
  );
}