"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Globe, Cpu } from "lucide-react";

export function Footer() {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 mt-auto py-8 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & UTC clock */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>DayMark on Botchain Testnet</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {utcTime || "Loading UTC..."}
          </span>
        </div>

        {/* Right: Network links */}
        <div className="flex items-center gap-6">
          <a
            href="https://scan.bohr.life"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>BohrScan Explorer</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://rpc.bohr.life"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>RPC Endpoint</span>
            <Globe className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
