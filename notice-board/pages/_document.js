import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="A modern notice board for exams, events, and announcements." />
        <meta name="theme-color" content="#0a0f0a" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-ink-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
