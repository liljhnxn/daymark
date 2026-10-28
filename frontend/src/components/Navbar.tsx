"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { botchain } from "@/config/chain";
import { DAYMARK_CONTRACT_ADDRESS } from "@/config/contract";
import { Wallet, LogOut, Check, Copy, ExternalLink, AlertTriangle, ShieldCheck } from "lucide-react";

export function Navbar() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCorrectNetwork = chainId === botchain.id;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Day<span className="text-cyan-400">Mark</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-emerald-400 border border-emerald-800/50">
                <div className="w-3.5 h-3.5 rounded-sm bg-black overflow-hidden flex items-center justify-center">
                  <Image
                    src="/botchain-logo.png"
                    alt="BOT Chain Logo"
                    width={14}
                    height={14}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>BOT CHAIN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">One day. One check-in. On-chain.</p>
          </div>
        </div>

        {/* Right side: Network Status, Contract Link & Wallet */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mainnet Explorer Contract Link with Logo in front */}
          <a
            href={`https://scan.botchain.ai/address/${DAYMARK_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            title="View DayMark Contract on BotScan Explorer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs font-medium transition-all"
          >
            <div className="w-4 h-4 rounded-sm bg-black overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>Explorer</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Network Indicator */}
          {mounted && isConnected && (
            <div className="hidden md:flex items-center">
              {isCorrectNetwork ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                  <div className="w-3.5 h-3.5 rounded-sm bg-black overflow-hidden flex items-center justify-center shrink-0">
                    <Image
                      src="/botchain-logo.png"
                      alt="BOT Chain"
                      width={14}
                      height={14}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>Mainnet (677)</span>
                </div>
              ) : (
                <button
                  onClick={() => switchChain({ chainId: botchain.id })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium hover:bg-amber-900/60 transition-all cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Switch to Botchain
                </button>
              )}
            </div>
          )}

          {/* Wallet Connection */}
          {!mounted ? (
            <div className="h-10 w-32 bg-slate-800/60 rounded-xl animate-pulse" />
          ) : isConnected && address ? (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/70 p-1.5 rounded-xl shadow-inner">
              <button
                onClick={copyAddress}
                title="Copy address"
                className="flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{shortenAddress(address)}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                )}
              </button>

              <a
                href={`https://scan.botchain.ai/address/${address}`}
                target="_blank"
                rel="noreferrer"
                title="View on BotScan"
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => disconnect()}
                title="Disconnect wallet"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
