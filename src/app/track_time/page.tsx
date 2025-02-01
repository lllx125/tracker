"use client";
import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function TrackTime() {
    const eventType = useContext(DataContext);
    console.log(eventType);
    return (
        <div className="flex px-[80px] flex-col items-start gap-[60px] flex-shrink-0">
            Track Time
        </div>
    );
}
