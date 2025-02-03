"use client";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";
import { getWeekEvents, getWeekRange, toMonthDate } from "../Time";
import type { Schema } from "../../../amplify/data/resource";
import Block from "./Block";
type Event = Schema["Event"]["type"];

export default function EventChart() {
    const { event } = useContext(DataContext);
    const [viewWeek, setViewWeek] = useState(0);
    const [currentEvents, setCurrentEvents] = useState(getWeekEvents(event));
    useEffect(() => {
        setCurrentEvents(getWeekEvents(event, viewWeek));
    }, [viewWeek, event]);
    return (
        <div>
            <h1 className="text-xl font-bold text-center">Event Chart</h1>
            <div className="flex w-full justify-between px-5">
                <p
                    className="font-bold text-xl active:text-orange-500"
                    onClick={() => {
                        setViewWeek(viewWeek + 1);
                    }}
                >
                    {"<"}
                </p>
                <h3 className="text-center self-center">
                    {toMonthDate(getWeekRange(viewWeek).monday.toISOString()) +
                        " ~ " +
                        toMonthDate(
                            getWeekRange(viewWeek).sunday.toISOString()
                        )}
                </h3>
                <p
                    className="font-bold text-xl active:text-orange-500"
                    onClick={() => {
                        setViewWeek(viewWeek - 1);
                    }}
                >
                    {">"}
                </p>
            </div>
            <div className="flex w-[315px] justify-between">
                {EventColumn(currentEvents[0], "Mon")}
                {EventColumn(currentEvents[1], "Tue")}
                {EventColumn(currentEvents[2], "Wed")}
                {EventColumn(currentEvents[3], "Thu")}
                {EventColumn(currentEvents[4], "Fri")}
                {EventColumn(currentEvents[5], "Sat")}
                {EventColumn(currentEvents[6], "Sun")}
            </div>
        </div>
    );
}

function EventColumn(events: Event[], day: string) {
    return (
        // The container represents the full day.
        // You can adjust the height (here h-[1440px] means 1440px, one pixel per minute).
        <div className="w-[45px]">
            <h3 className="font-bold text-center">{day}</h3>
            <div className="relative h-[300px] border-x border-black">
                {events.map((event) => (
                    <Block event={event} key={event.id} />
                ))}
            </div>
        </div>
    );
}
