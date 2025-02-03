import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";
import type { Schema } from "../../../amplify/data/resource";
import { getMinuteDifference, toHourMinute } from "../Time";
type Event = Schema["Event"]["type"];

export default function Block(props: { event: Event }) {
    // Total minutes 8:00~22:00
    const totalMinutes = (22 - 8) * 60;
    const { eventType } = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    const startDate = new Date(props.event.startTime);
    const endDate = new Date(props.event.endTime);
    const type = eventType.find(
        (type: { id: string }) => type.id == props.event.typeID
    );
    const color = type ? type.color : "white";
    const typeDescription = type?.description;

    // Calculate minutes from midnight for start and end times.
    const startMinutes =
        (startDate.getHours() - 8) * 60 + startDate.getMinutes();
    const endMinutes = (endDate.getHours() - 8) * 60 + endDate.getMinutes();

    // Calculate the top position and height as a percentage.
    const topPercent = (startMinutes / totalMinutes) * 100;
    const heightPercent = ((endMinutes - startMinutes) / totalMinutes) * 100;

    // When the window is open, attach global listeners for mouseup, touchend, and touchcancel.
    useEffect(() => {
        if (!isOpen) return;

        const handleRelease = () => {
            setIsOpen(false);
        };

        // Add both mouse and touch event listeners.
        document.addEventListener("mouseup", handleRelease);
        document.addEventListener("touchend", handleRelease);
        document.addEventListener("touchcancel", handleRelease);

        // Cleanup the event listeners when the window is closed.
        return () => {
            document.removeEventListener("mouseup", handleRelease);
            document.removeEventListener("touchend", handleRelease);
            document.removeEventListener("touchcancel", handleRelease);
        };
    }, [isOpen]);

    const handlePressStart = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div
                className="absolute w-full bg-blue-400  active:border-2 border-white transition-all duration-200"
                style={{
                    top: `${topPercent}%`,
                    height: `${heightPercent}%`,
                    backgroundColor: `${color}`,
                }}
                onMouseDown={handlePressStart}
                onTouchStart={handlePressStart}
            ></div>
            {isOpen && (
                <div
                    className="absolute top-1 ml-0.5 text-xs border-gray-700 border rounded bg-gray-300"
                    style={{
                        top: `${topPercent + heightPercent}%`,
                    }}
                >
                    <h1 className="font-bold text-[8px]">{typeDescription}</h1>
                    <div className="text-[5px] leading-[6px]">
                        <p>{props.event.description}</p>
                        <p>{"Start: " + toHourMinute(props.event.startTime)}</p>
                        <p>{"End: " + toHourMinute(props.event.endTime)}</p>
                        <p>
                            {"Duration: " +
                                getMinuteDifference(
                                    props.event.endTime,
                                    props.event.startTime
                                ) +
                                " min"}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
