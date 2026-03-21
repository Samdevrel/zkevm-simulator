import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zkEVM Simulator | @samdevrel",
  description: "Ethereum-compatible ZK rollup simulator. View transactions, gas usage, and throughput metrics.",
  keywords: ["zkevm", "zero-knowledge", "rollup", "scaling", "ethereum", "zk-proof"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
