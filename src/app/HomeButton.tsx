"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeButton() {
    const router = useRouter();
    return (
        <Image
            src="home.svg"
            alt="home"
            width={50}
            height={50}
            className="px-3 py-6"
            onClick={() => router.push("/")}
        />
    );
}
