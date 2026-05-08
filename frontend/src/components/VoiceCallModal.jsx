import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";

const VoiceCallModal = ({ 
  callData, 
  onAccept, 
  onReject, 
  onEnd, 
  callStatus 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (callStatus === "connected") {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (callStatus === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-rose-500/20 blur-[150px] rounded-full" />
        </div>

        <motion.div 
          className="bg-[#1e293b]/50 w-full max-w-sm rounded-[3rem] p-10 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          {/* User Avatar */}
          <div className="relative mb-8">
            <motion.div 
              className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-amber-500"
              animate={{ rotate: callStatus === "connected" ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#1e293b]">
                <img 
                  src={callData?.peerImage || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4703.jpg"} 
                  alt="Caller" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {callStatus === "connected" && (
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-2xl border-4 border-[#1e293b] shadow-lg shadow-emerald-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Volume2 size={18} className="text-white" />
              </motion.div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {callData?.peerName || "Traveler"}
          </h2>
          
          <p className="text-rose-400 font-medium tracking-widest uppercase text-[10px] mb-10 animate-pulse">
            {callStatus === "incoming" && "Incoming Voice Call..."}
            {callStatus === "outgoing" && "Calling traveler..."}
            {callStatus === "connected" && <span className="text-emerald-400 font-mono text-sm">{formatDuration(duration)}</span>}
          </p>

          {/* Controls */}
          <div className="flex gap-8 items-center">
            {callStatus === "incoming" ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={onReject}
                  className="p-6 bg-red-500 rounded-full text-white shadow-lg shadow-red-500/40"
                >
                  <PhoneOff size={30} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={onAccept}
                  className="p-6 bg-emerald-500 rounded-full text-white shadow-lg shadow-emerald-500/40"
                >
                  <Phone size={30} />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-5 rounded-full border transition-all ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }}
                  onClick={onEnd}
                  className="p-7 bg-red-500 rounded-full text-white shadow-xl shadow-red-500/50"
                >
                  <PhoneOff size={34} />
                </motion.button>

                <div className="p-5 rounded-full bg-white/5 border border-white/10 text-white/40">
                  <Volume2 size={24} />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceCallModal;
