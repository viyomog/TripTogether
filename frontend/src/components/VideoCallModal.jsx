import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Minimize2, Volume2 } from "lucide-react";

const VideoCallModal = ({ 
  callData, 
  onAccept, 
  onReject, 
  onEnd, 
  callStatus,
  localStream,
  remoteStream
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, callStatus]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, callStatus]);

  useEffect(() => {
    let interval;
    if (callStatus === "connected") {
      interval = setInterval(() => setDuration(prev => prev + 1), 1000);
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
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background Blur Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
          
          {/* Main Container */}
          <div className="relative w-full h-full max-w-6xl aspect-video bg-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
            
            {/* Remote Video (Full Screen) */}
            <div className="w-full h-full bg-[#0f172a] relative flex items-center justify-center">
              {callStatus === "connected" ? (
                <video 
                  ref={remoteVideoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center z-10">
                  <motion.div 
                    className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-violet-500 mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0f172a]">
                      <img src={callData?.peerImage || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4703.jpg"} alt="User" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-2">{callData?.peerName || "Traveler"}</h2>
                  <p className="text-rose-400 font-medium tracking-widest uppercase text-xs animate-pulse">
                    {callStatus === "incoming" ? "Incoming Video Call..." : "Calling..."}
                  </p>
                </div>
              )}

              {/* Status Overlay */}
              {callStatus === "connected" && (
                <div className="absolute top-8 left-8 flex items-center gap-4 bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 z-20">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-rose-500 shadow-lg shadow-rose-500/20">
                    <img src={callData?.peerImage || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4703.jpg"} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{callData?.peerName}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                      <p className="text-gray-300 text-[11px] font-mono">{formatDuration(duration)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Local Video (Floating) */}
            {localStream && (
              <motion.div 
                className="absolute bottom-8 right-8 w-40 md:w-64 aspect-video bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-30 group"
                drag
                dragConstraints={{ left: -800, right: 0, top: -500, bottom: 0 }}
              >
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
                />
                {isVideoOff && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <VideoOff size={20} className="text-gray-500" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-[10px] font-medium">You</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Control Bar */}
          <motion.div 
            className="mt-10 flex items-center gap-8 bg-white/5 backdrop-blur-2xl px-10 py-6 rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {callStatus === "incoming" ? (
              <>
                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={onReject} 
                  className="p-6 bg-red-500/90 hover:bg-red-500 rounded-full text-white shadow-[0_10px_25px_rgba(239,68,68,0.4)] transition-all"
                >
                  <PhoneOff size={32} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={onAccept} 
                  className="p-6 bg-emerald-500/90 hover:bg-emerald-500 rounded-full text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all"
                >
                  <Video size={32} />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)} 
                  className={`p-5 rounded-full border transition-all ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  {isMuted ? <MicOff size={26} /> : <Mic size={26} />}
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }}
                  onClick={onEnd} 
                  className="p-7 bg-red-500 rounded-full text-white shadow-[0_15px_35px_rgba(239,68,68,0.5)] transition-all"
                >
                  <PhoneOff size={36} />
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVideoOff(!isVideoOff)} 
                  className={`p-5 rounded-full border transition-all ${isVideoOff ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  {isVideoOff ? <VideoOff size={26} /> : <Video size={26} />}
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoCallModal;

