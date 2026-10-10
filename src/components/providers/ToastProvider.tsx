"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type ToastCtxValue = {
  showToast: (msg: string) => void;
};

const ToastCtx = createContext<ToastCtxValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ id: Date.now(), msg });
    timerRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-2.5 px-5 py-3 rounded-full bg-surface/95 border border-gold/50 backdrop-blur-md shadow-2xl"
            role="status"
          >
            <CheckCircle2 className="w-5 h-5 text-goldlight shrink-0" />
            <span className="text-sm text-ivory font-medium whitespace-nowrap">
              {toast.msg}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ToastCtx.Provider>
  );
}