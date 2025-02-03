"use client";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function ListOfLinks() {
    const router = useRouter();
    // route to certain link
    const goTo = (link: string) => {
        router.push(link);
    };
    // 4 buttons to go to page that generate a list from the database
    return (
        <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
            <h1 className="self-center font-extrabold text-xl">List Items</h1>
            <div className="flex text-xs font-semibold justify-between w-full">
                <Button
                    className="border-black border-2 p-1"
                    onClick={() => goTo("analyze/list_event")}
                >
                    Event
                </Button>
                <Button
                    className="border-black border-2 p-1"
                    onClick={() => goTo("analyze/list_event_type")}
                >
                    Event Type
                </Button>
                <Button
                    className="border-black border-2 p-1"
                    onClick={() => goTo("analyze/list_exercise")}
                >
                    Exercise
                </Button>
                <Button
                    className="border-black border-2 p-1"
                    onClick={() => goTo("analyze/list_exercise_type")}
                >
                    Exercise Type
                </Button>
            </div>
        </div>
    );
}
