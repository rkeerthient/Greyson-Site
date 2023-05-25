import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { IoCaretDownOutline } from "react-icons/io5";
import cx from "classnames";
import { IoChatbubblesSharp } from "react-icons/io5";
import { getRuntime } from "@yext/pages/util";
import { z } from "zod";

interface IFrameParams {
  conversationId?: string;
  pageUrl?: string;
  referrerPageUrl?: string;
  visitorId?: string;
}

const EventDataSchema = z.object({
  data: z.object({
    id: z.string(),
  }),
  eventType: z.string(),
  source: z.string(),
});

const baseUrl = "https://yext-chatbot-prod.up.railway.app/bots";

export function ChatBot({ configId }: { configId: string }) {
  const runtime = getRuntime();
  const [showChat, setShowChat] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeParams, setIframeParams] = useState<IFrameParams>({});

  useEffect(() => {
    if (runtime.name === "browser") {
      const pageUrl = window.location.href;
      const referrerPageUrl = document.referrer;
      let conversationId: string | null =
        sessionStorage.getItem("conversationId");
      conversationId = conversationId === "undefined" ? null : conversationId;
      const visitorId = sessionStorage.getItem("visitorId");
      setIframeParams({
        pageUrl,
        referrerPageUrl,
        ...(conversationId && { conversationId }),
        ...(visitorId && { visitorId }),
      });
    }
  }, []);

  useEffect(() => {
    if (runtime.name === "browser") {
      const handleMessage = (event: MessageEvent) => {
        let parsedData;
        try {
          parsedData = EventDataSchema.parse(event.data);
        } catch (e) {
          return;
        }

        if (parsedData.eventType === "createNewConversation") {
          sessionStorage.setItem("conversationId", parsedData.data.id);
        }
      };

      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [iframeRef.current]);

  const iFrameUrl = new URL(`${baseUrl}/${configId}`);
  const params = new URLSearchParams(
    Object.entries(iframeParams).filter(([_, value]) => value !== null)
  );
  iFrameUrl.search = params.toString();

  return (
    <div>
      <div className="chat-button">
        {showChat && (
          <iframe
            src={iFrameUrl.toString()}
            style={{ height: "500px", width: "400px" }}
            width="500"
            height="300"
            title="Example"
          ></iframe>
        )}
        {!showChat ? (
          <IoChatbubblesSharp
            onClick={() => setShowChat(!showChat)}
            style={{ fontSize: "1.875rem", lineHeight: "2.25rem" }}
          />
        ) : (
          <IoCaretDownOutline
            onClick={() => setShowChat(!showChat)}
            style={{ fontSize: "1.875rem", lineHeight: "2.25rem" }}
          />
        )}
      </div>
    </div>
  );
}
