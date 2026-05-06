import type { Metadata } from "next";
import { IconsExplorer } from "../../components/icons/icons-explorer";
import { Navbar } from "../../components/navbar";

export const metadata: Metadata = {
  description: "Browse and copy the icon components shipped with Zeron UI.",
  title: "AI Studio Icons",
};

export default function IconsPage() {
  return (
    <>
      <Navbar />
      <IconsExplorer />
    </>
  );
}
