"use client";
import { useContext } from "react";
import { DataContext } from "../DataContext";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function Analyze() {
    // obtain data base from the layout
    const { event, eventType, exercise, exerciseType } =
        useContext(DataContext);
    const router = useRouter();
    console.log(event, eventType, exercise, exerciseType);
    // route to certain link
    const goTo = (link: string) => {
        router.push(link);
    };
    return (
        <div className="flex px-[40px] py-[40px] gap-[40px] flex-col items-start flex-shrink-0">
            <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
                <h1 className="self-center font-extrabold text-xl">
                    List Items
                </h1>
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
        </div>
    );
}
