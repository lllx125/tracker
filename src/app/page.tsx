"use client";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex py-[60px] px-[80px] flex-col items-center gap-[60px] flex-shrink-0">
            <Button
                className="bg-green-300 border-green-600 border-2 rounded-2xl text-3xl py-[40px] w-full"
                onClick={() => router.push("/track_time")}
            >
                Track Time
            </Button>
            <Button
                className="bg-blue-300 border-blue-600 border-2 rounded-2xl text-3xl py-[40px] w-full"
                onClick={() => router.push("/track_exercise")}
            >
                Track Exercise
            </Button>
            <Button
                className="bg-red-300 border-red-600 border-2 rounded-2xl text-3xl py-[40px] w-full"
                onClick={() => router.push("/analyze")}
            >
                Analyze
            </Button>
        </div>
    );
}
