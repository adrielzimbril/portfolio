"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";

export function AdminCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-black/8 bg-white shadow-[0_1px_0_rgba(17,25,31,0.04)]",
        className,
      )}
    >
      {children}
    </Card>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const tones = {
    neutral: "bg-black/5 text-black/60",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-[#ffed90] text-[#11191f]",
    danger: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-[20px] border border-dashed border-black/10 bg-black/2 p-8 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white text-black/70 shadow-sm">
        <Icon size={20} />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
        {description}
      </p>
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full min-w-0 md:max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-xl border-black/8 bg-white text-sm"
      />
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  loading,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const tShared = useTranslations("admin.landlord.shared");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" variant="modern">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogSeparator />
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            asPointer
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {tShared("cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            asIcon
            asPointer
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ElementType;
  tone: "dark" | "yellow" | "green" | "white";
}) {
  const toneClass = {
    dark: "bg-[#90cbff]",
    yellow: "bg-[#ffed90]",
    green: "bg-[#98ff90]",
    white: "bg-[#d890ff]",
  };

  return (
    <AdminCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-black/50">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            {value}
          </p>
          <p className="mt-2 text-xs text-black/45">{detail}</p>
        </div>
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-2xl",
            toneClass[tone],
          )}
        >
          <Icon size={19} />
        </div>
      </div>
    </AdminCard>
  );
}

export function TablePager({
  page,
  pageSize,
  count,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
}) {
  const tShared = useTranslations("admin.landlord.shared");
  const totalPages = Math.max(Math.ceil(count / pageSize), 1);
  return (
    <div className="flex items-center justify-between gap-3 border-t border-black/8 px-5 py-4 text-sm">
      <Badge variant="white">
        {tShared("page", { page, total: totalPages })}
      </Badge>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xs"
          asPointer
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {tShared("previous")}
        </Button>
        <Button
          variant="outline"
          size="xs"
          asPointer
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          {tShared("next")}
        </Button>
      </div>
    </div>
  );
}
