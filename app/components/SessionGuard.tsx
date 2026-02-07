"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

// ── Configuration ──────────────────────────────────────────────
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity
const WARNING_SECONDS = 60; // 60-second countdown before auto-logout
const THROTTLE_MS = 5_000; // Minimum 5s between activity resets
const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
] as const;

export function SessionGuard() {
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_SECONDS);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastResetRef = useRef<number>(Date.now());
  const isLoginPage = pathname === "/login";

  // ── Logout handler ──────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  }, []);

  // ── Clear all timers ────────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  // ── Start idle timer ────────────────────────────────────────
  const startIdleTimer = useCallback(() => {
    clearTimers();

    idleTimerRef.current = setTimeout(() => {
      // Idle timeout reached — start warning countdown
      setShowWarning(true);
      setCountdown(WARNING_SECONDS);

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Time's up — auto-logout
            clearTimers();
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, IDLE_TIMEOUT_MS);
  }, [clearTimers, handleLogout]);

  // ── Reset on user activity ──────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    setShowWarning(false);
    setCountdown(WARNING_SECONDS);
    startIdleTimer();
  }, [startIdleTimer]);

  // ── Attach activity listeners ───────────────────────────────
  useEffect(() => {
    if (isLoginPage) return;

    startIdleTimer();

    const onActivity = () => {
      const now = Date.now();
      if (now - lastResetRef.current > THROTTLE_MS) {
        lastResetRef.current = now;
        resetIdleTimer();
      }
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }

    return () => {
      clearTimers();
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
    };
  }, [isLoginPage, startIdleTimer, resetIdleTimer, clearTimers]);

  // Don't render anything on the login page
  if (isLoginPage) return null;

  // Sign-out button is in the app header (LogoutButton component).
  // SessionGuard only renders the idle warning modal.
  if (!showWarning) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="idle-warning-title"
      aria-describedby="idle-warning-desc"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border-4 border-amber-500">
        <div className="text-center space-y-4">
          <div className="text-4xl">&#9918;</div>
          <h2
            id="idle-warning-title"
            className="text-xl font-bold text-amber-800"
          >
            Still playing?
          </h2>
          <p id="idle-warning-desc" className="text-amber-700 text-sm">
            You&apos;ve been inactive for a while. You&apos;ll be signed out
            in{" "}
            <span className="text-red-600 font-mono font-bold text-lg">
              {countdown}s
            </span>{" "}
            for security.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={resetIdleTimer}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-amber-600 transition focus:ring-2 focus:ring-orange-500 focus:outline-none border-2 border-orange-600"
            >
              I&apos;m here!
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 py-2.5 px-4 bg-amber-100 text-amber-800 font-medium rounded-lg hover:bg-amber-200 transition disabled:opacity-50 focus:ring-2 focus:ring-amber-400 focus:outline-none border-2 border-amber-300"
            >
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
