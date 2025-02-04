"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { doSignOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: "Courses", href: "/courses" },
    { name: "My Resources", href: "/resources" },
    { name: "Evaluation", href: "/teacher/evaluation" },
    { name: "Find Teachers", href: "/student/FindTeacher/" },
    { name: "My Profile", href: "/profile" },
  ];

  const onSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningOut) {
      setIsSigningOut(true);
      try {
        await doSignOut();
        router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
        setIsSigningOut(false); // Reset signing-out state
      }
    }
  };

  if (pathname === "/login" || pathname === "/") return;

  return (
    <header className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between p-4 px-16 shadow-lg">
      <Link href="/home" className="text-3xl text-green-500 font-bold my-auto">
        EqualEd
      </Link>
      <div className="flex flex-row justify-between">
        <nav className="my-auto flex gap-4 items-center">
          {navigation.map((item) => {
            const isActive = pathname === item.href; // Check active link

            return (
              <Link
                href={item.href}
                key={item.name}
                className={`py-1 px-4 rounded-full ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-black hover:bg-green-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={onSignOut}
          className="hover:bg-red-500 hover:text-white rounded-full px-3 py-1"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
