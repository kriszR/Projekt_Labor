"use client";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </main>
    </>
  );
}
