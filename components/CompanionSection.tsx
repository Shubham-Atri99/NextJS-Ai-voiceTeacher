"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/Vapi.sdk"; // make sure vapi is initialized correctly inside Vapi.sdk
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companions.action";


enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionSection = ({
  companionId,
  subject,
  topic,
  name,
  username,
  userimage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
 

  // 🔊 Control lottie animation based on speaking state
  useEffect(() => {
    if (isSpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.stop();
    }
  }, [isSpeaking]);

  // 🎧 Attach vapi listeners
  useEffect(() => {
    if (!vapi) return;

    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.error("VAPI Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [companionId]);

  // 🎤 Toggle mic
  const toggleMicrophone = () => {
    const isCurrentlyMuted = vapi.isMuted();
    vapi.setMuted(!isCurrentlyMuted);
    setIsMuted(!isCurrentlyMuted);
  };

  // 📞 Start call
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    try {
      await vapi.start(configureAssistant(voice, style), assistantOverrides);
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  // ❌ End call
  const handleDisconnect = () => {
    vapi.stop();
    setCallStatus(CallStatus.FINISHED);
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        {/* Companion Section */}
        <div className="companion-section">
          <div
            className="companion-avatar relative"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            {/* Idle / Connecting */}
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={subject ? `/icons/${subject}.svg` : "/icons/default.svg"}
                alt={subject || "default"}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            {/* Active Wave Animation */}
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        {/* User Section */}
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userimage || "/icons/default.svg"}
              alt={username|| "User"}
              width={130}
              height={130}
              className="rounded-lg"
              unoptimized
            />
            <p className="font-bold text-2xl">{username}</p>
          </div>

          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>

          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE
                ? "bg-red-700"
                : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Session"}
          </button>
        </div>
      </section>

     {/* Transcript Section */}
<section className="transcript h-64 sm:h-80">   {/* ✅ fixed height */}
  <div className="transcript-message no-scrollbar text-gray-800">
    {messages.length === 0 && (
      <p className="text-gray-400 text-center">Transcript will appear here...</p>
    )}
    {messages.map((message, index) =>
      message.role === "assistant" ? (
        <p key={index} className="max-sm:text-sm">
          {name.split(" ")[0].replace(/[.,]/g, ",")}: {message.content}
        </p>
      ) : (
        <p key={index} className="text-primary max-sm:text-sm">
          {username}: {message.content}
        </p>
      )
    )}
  </div>
  <div className="transcript-fade" />
</section>

    </section>
  );
};

export default CompanionSection;
