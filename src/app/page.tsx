"use client";

import { redirect } from "next/navigation";

export default function Home() {

  return (
    <main className=""> 
     {redirect('/ai')}
    </main>
  );
}
