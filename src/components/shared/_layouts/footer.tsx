"use client";

export function Footer() {
  return (
    <footer className="relative w-full py-6 bg-b-base rounded-2xl mb-4">
      <div className="text-center mt-8">
        <p className="w-full relative font-medium text-b-white-foreground">
          Copyright Holder © {new Date().getFullYear()} - All Right Reserved -
          Designed with ❣️ by Adriel ZIMBRIL.
        </p>
      </div>
    </footer>
  );
}
