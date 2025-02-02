"use client";
import { useContext } from "react";
import { DataContext } from "../../DataContext";
import { getMinuteDifference } from "@/app/Time";

export default function ExerciseList() {
    const { event, eventType } = useContext(DataContext);

    return (
        <div className="flex px-[40px] py-[40px] gap-5 flex-col items-start flex-shrink-0">
            <h1 className="text-xl font-bold">List of Events:</h1>
            <ul className="font-bold gap-3 px-1 list-disc">
                {event.map((item, key) => (
                    <li key={key}>
                        {item ? (
                            <>
                                <h1 className="font-bold text-lg">
                                    {" "}
                                    {
                                        eventType.find(
                                            (type: { id: string }) =>
                                                type.id == item.typeID
                                        )?.description
                                    }{" "}
                                </h1>
                                <div className="text-sm">
                                    <p>{item.description}</p>
                                    <p>{"Start: " + item.startTime}</p>
                                    <p>{"End: " + item.endTime}</p>
                                    <p>
                                        {"Duration: " +
                                            getMinuteDifference(
                                                item.endTime,
                                                item.startTime
                                            ) +
                                            " min"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            "Fetching Data..."
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
