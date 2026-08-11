import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"

export const metadata: Metadata = {
  title: "Unscript — AI Writing Humanizer",
  description: "Transform AI-generated text into writing that reads authentically human. Passes every major AI detector.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
