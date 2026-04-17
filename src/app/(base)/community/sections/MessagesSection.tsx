"use client";
import React from "react";
import { GuestbookList } from "../components/GuestbookList";

export function MessagesSection() {
  return (
    <div className="lg:col-span-2">
      <GuestbookList />
    </div>
  );
}
