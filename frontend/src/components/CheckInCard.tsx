"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import confetti from "canvas-confetti";
import {
  DAYMARK_ABI,
  DAYMARK_CONTRACT_ADDRESS,
  isContractConfigured,
} from "@/config/contract";
import { botchainTestnet } from "@/config/chain";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Flame,
  Calendar,
  Wallet,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export function CheckInCard() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect } = useConnect();
  const { switchChain } = useSwitchChain();
  const [mounted, setMounted] = useState(false);
  const [timeUntilNextDay, setTimeUntilNextDay] = useState("");

  const isConfigured = isContractConfigured();
  const isCorrectNetwork = chainId === botchainTestnet.id;

  // Read check-in details from DayMark smart contract
  const {
    data: checkInData,
    isLoading: isReadingData,
    refetch: refetchCheckInData,
  } = useReadContract({
    address: DAYMARK_CONTRACT_ADDRESS,
    abi: DAYMARK_ABI,
    functionName: "getCheckInInfo",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isConnected && isConfigured && isCorrectNetwork),
    },
  });

  // Contract write hook
  const {
    data: txHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Transaction confirmation hook
  const {
    isLoading: isTxConfirming,
    isSuccess: isTxConfirmed,
    error: txReceiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Countdown timer to next UTC 00:00:00
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextUtcMidnight = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          0,
          0,
          0
        )
      );
      const diffMs = nextUtcMidnight.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeUntilNextDay("00h 00m 00s");
        return;
      }
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeUntilNextDay(
        `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // When check-in transaction completes successfully
  useEffect(() => {
    if (isTxConfirmed) {
      refetchCheckInData();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#06b6d4", "#3b82f6", "#10b981", "#6366f1"],
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isTxConfirmed, refetchCheckInData]);

  const latestTimestamp = checkInData ? Number(checkInData[0]) : 0;
  const totalCount = checkInData ? Number(checkInData[1]) : 0;
  const checkedInToday = checkInData ? Boolean(checkInData[2]) : false;

  const handleCheckIn = () => {
    resetWrite();
    writeContract({
      address: DAYMARK_CONTRACT_ADDRESS,
      abi: DAYMARK_ABI,
      functionName: "checkIn",
    });
  };

  const formatLastCheckIn = (timestamp: number) => {
    if (!timestamp || timestamp === 0) return "Never";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getFriendlyErrorMessage = (err: unknown): string => {
    if (!err) return "";
    const msg = String(err);
    if (msg.includes("User rejected") || msg.includes("User denied")) {
      return "Transaction was cancelled in your wallet.";
    }
    if (msg.includes("Already checked in today")) {
      return "You have already checked in for the current UTC day.";
    }
    if (msg.includes("insufficient funds")) {
      return "Insufficient BOT funds to cover the gas fee.";
    }
    return "Transaction failed. Please ensure you are connected to Botchain Testnet and try again.";
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 animate-pulse h-96" />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Contract configuration banner if address is not set yet */}
      {!isConfigured && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200 text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-300">Contract Address Pending</p>
            <p className="text-xs text-amber-200/80">
              Deploy the contract to Botchain Testnet using Hardhat, then set{" "}
              <code className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300">
                NEXT_PUBLIC_DAYMARK_CONTRACT_ADDRESS
              </code>{" "}
              in <code className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300">frontend/.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* Main Check-In Card */}
      <div className="relative rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Glow ambient background inside card */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Status Icon */}
          <div className="mb-6 relative">
            {!isConnected ? (
              <div className="w-24 h-24 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 shadow-inner">
                <Wallet className="w-10 h-10" />
              </div>
            ) : !isCorrectNetwork ? (
              <div className="w-24 h-24 rounded-3xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                <AlertCircle className="w-10 h-10" />
              </div>
            ) : checkedInToday ? (
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-12 h-12 animate-in zoom-in-75 duration-300" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20 animate-pulse-glow">
                <Sparkles className="w-10 h-10" />
              </div>
            )}
          </div>

          {/* Status Message */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {!isConnected
              ? "Connect Your Wallet"
              : !isCorrectNetwork
              ? "Switch to Botchain Testnet"
              : checkedInToday
              ? "Checked In Today!"
              : "Ready to Check In"}
          </h2>

          <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
            {!isConnected
              ? "Connect your Web3 wallet to record your daily check-in on the Botchain Testnet blockchain."
              : !isCorrectNetwork
              ? "Your wallet is on another network. Please switch to Botchain Testnet (Chain ID 968) to proceed."
              : checkedInToday
              ? "You have successfully marked your attendance for today's UTC calendar day."
              : "Claim your daily presence on Botchain Testnet. One check-in allowed per UTC calendar day."}
          </p>

          {/* Action Button */}
          <div className="w-full max-w-md">
            {!isConnected ? (
              <button
                onClick={() => {
                  const conn = connectors[0];
                  if (conn) connect({ connector: conn });
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-base shadow-xl shadow-cyan-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            ) : !isCorrectNetwork ? (
              <button
                onClick={() => switchChain({ chainId: botchainTestnet.id })}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold text-base shadow-xl shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Switch to Botchain Testnet</span>
              </button>
            ) : checkedInToday ? (
              <button
                disabled
                className="w-full py-4 px-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-400 font-semibold text-base cursor-not-allowed flex items-center justify-center gap-2 shadow-inner"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Already Checked In Today</span>
              </button>
            ) : (
              <button
                onClick={handleCheckIn}
                disabled={isWritePending || isTxConfirming || !isConfigured}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-base shadow-xl shadow-cyan-500/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isWritePending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Confirm in Wallet...</span>
                  </>
                ) : isTxConfirming ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Broadcasting to Chain...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Check In Today</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Countdown to Next UTC Day */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-950/40 border border-slate-800/80 px-4 py-2 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next UTC Day resets in:</span>
            <span className="font-mono font-semibold text-slate-200">
              {timeUntilNextDay || "--h --m --s"}
            </span>
          </div>

          {/* Transaction Status Alerts */}
          {(isWritePending || isTxConfirming) && (
            <div className="mt-6 w-full p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
              <span>
                {isWritePending
                  ? "Please review and confirm the transaction in your wallet..."
                  : "Transaction submitted! Waiting for block confirmation on Botchain Testnet..."}
              </span>
            </div>
          )}

          {isTxConfirmed && txHash && (
            <div className="mt-6 w-full p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Check-in confirmed on Botchain Testnet!</span>
              </div>
              <a
                href={`https://scan.bohr.life/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-semibold text-emerald-300 hover:text-emerald-100 underline shrink-0"
              >
                View Transaction <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {(writeError || txReceiptError) && (
            <div className="mt-6 w-full p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{getFriendlyErrorMessage(writeError || txReceiptError)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Connected Wallet Stats Grid */}
      {isConnected && isCorrectNetwork && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Total Check-Ins */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Check-Ins</p>
              <p className="text-2xl font-extrabold text-white">
                {isReadingData ? "--" : totalCount}
              </p>
            </div>
          </div>

          {/* Last Check-In */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 font-medium">Last Check-In</p>
              <p className="text-sm font-semibold text-slate-200 truncate">
                {isReadingData ? "--" : formatLastCheckIn(latestTimestamp)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
