"use client";
import { Button, Input } from "@aws-amplify/ui-react";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import {
    convertToISO,
    getMinuteDifference,
    subtractMinutes,
    Time,
} from "../Time";

//create client
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();
export default function AddEventForm() {
    // Variables
    const { eventType, setEvent } = useContext(DataContext);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    // end time is the current time, start time and duration are calculated from one another as enter is hit or the field is on blur
    const endTime = Time();
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);

    const createEvent = async () => {
        if (type == "" || duration < 1 || startTime === "") {
            return;
        }
        const { data: newEvent } = await client.models.Event.create({
            description,
            typeID: type,
            endTime,
            startTime,
        });
        // append the new data to the front of the current list of exercise so that no refetching and ordering is needed
        if (newEvent) {
            setEvent((prevItems) => [newEvent, ...prevItems]);
        }
        setType("");
        setDescription("");
        setStartTime(endTime);
        setDuration(0);
    };

    return (
        <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
            <h1 className="self-center font-extrabold text-xl">Track Event</h1>
            <h3 className="font-bold">Event Type</h3>
            <select
                className="w-full"
                onChange={(event) => setType(event.target.value)}
                value={type}
            >
                <option value="" disabled hidden>
                    Select an option
                </option>
                {eventType.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.description}
                    </option>
                ))}
            </select>
            <h3 className="font-bold">Description</h3>
            <Input
                placeholder="Description"
                className="w-full"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <h3 className="font-bold">Duration (min)</h3>
            <Input
                placeholder="Duration"
                className="w-full"
                value={duration}
                onChange={(event) => {
                    if (event.target.value) {
                        setDuration(parseInt(event.target.value));
                    } else {
                        setDuration(0);
                    }
                }}
                onBlur={() => {
                    setStartTime(subtractMinutes(endTime, duration));
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setStartTime(subtractMinutes(endTime, duration));
                    }
                }}
            />
            <h3 className="font-bold">Start Time</h3>
            <Input
                placeholder="Start Time"
                className="w-full"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                onFocus={() => setStartTime("")}
                onBlur={() => {
                    setDuration(
                        getMinuteDifference(endTime, convertToISO(startTime))
                    );
                    setStartTime(convertToISO(startTime));
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setDuration(
                            getMinuteDifference(
                                endTime,
                                convertToISO(startTime)
                            )
                        );
                        setStartTime(convertToISO(startTime));
                    }
                }}
            />
            <h3 className="font-bold">End Time</h3>
            <Input
                placeholder="End Time"
                className="w-full"
                defaultValue={endTime}
                readOnly
            />
            <Button
                className="w-full bg-green-300 active:bg-green-600"
                onClick={() => createEvent()}
            >
                Log
            </Button>
        </div>
    );
}
