import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Blog?!",
  description: "Funny little blog",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Provider>
          <Navbar />
          <main>{children}
            {modal}
            <div id="modal-root" />
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
