import { createFileRoute } from "@tanstack/react-router";
import { DecoderApp } from "@/components/decoder/decoder-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <DecoderApp />;
}
