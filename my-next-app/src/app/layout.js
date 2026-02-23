"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Provider from "./provider";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider>
           {children}
        </Provider>
         
   
      </body>
    </html>
  );
}
