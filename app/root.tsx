// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import tailwindStylesUrl from "./tailwind.css?url"; // Correct import for CSS files

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesUrl },
];

export default function App() {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links /><title>
        S-MUSH 🌱IENDA
      </title>
      </head>
      <body>
      <Outlet />
      <ScrollRestoration />
      <Scripts /> {/* <-- This is required for client-side JS */}
      <LiveReload />
      </body>
      </html>
  );
}