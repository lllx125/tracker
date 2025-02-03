"use client";
import { Button, Input } from "@aws-amplify/ui-react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";
import { Future, Time } from "../Time";

//create client
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

// start to record an event or end a started event
export default function StartEvent() {
    //variables
    const { event, eventType, setEvent } = useContext(DataContext);
    const [type, setType] = useState("");
    const [started, setStarted] = useState(false);
    const [description, setDescription] = useState("");
    // If the end time of the latest event is in the future, then an event has started
    useEffect(() => {
        if (!event[0]) return;
        if (new Date(event[0].endTime).getTime() > new Date(Time()).getTime()) {
            setStarted(true);
        } else {
            setStarted(false);
        }
    }, [event]);

    const updateEvent = async () => {
        const { data: newEvent } = await client.models.Event.update({
            id: event[0].id,
            endTime: Time(),
        });
        // append the new data to the front of the current list of exercise so that no refetching and ordering is needed
        if (newEvent) {
            setEvent((prevItems) => [newEvent, ...prevItems.slice(1)]);
        }
        setType("");
        setDescription("");
    };

    const startEvent = async () => {
        if (type == "") {
            return;
        }
        const { data: newEvent } = await client.models.Event.create({
            description,
            typeID: type,
            endTime: Future(), // put a future end time to suggest this event has not ended
            startTime: Time(),
        });
        // append the new data to the front of the current list of exercise so that no refetching and ordering is needed
        if (newEvent) {
            setEvent((prevItems) => [newEvent, ...prevItems]);
        }
        setStarted(true);
    };
    // check whether an event has been started, if yes, display the end page, if not dis play the start page
    if (started) {
        return (
            <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
                <h1 className="self-center font-extrabold text-xl">
                    End Event
                </h1>
                <h3 className="font-bold">Event Type</h3>
                <select
                    className="w-full"
                    value={event.length > 0 ? event[0].typeID : ""}
                    aria-readonly
                >
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
                    value={
                        event && event[0] && event[0].description
                            ? event[0].description
                            : ""
                    }
                    readOnly
                />
                <Button
                    className="w-full bg-green-300 active:bg-green-600"
                    onClick={() => updateEvent()}
                >
                    End Event
                </Button>
            </div>
        );
    } else {
        return (
            <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
                <h1 className="self-center font-extrabold text-xl">
                    Start Event
                </h1>
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
                <Button
                    className="w-full bg-green-300 active:bg-green-600"
                    onClick={() => startEvent()}
                >
                    Start Event
                </Button>
            </div>
        );
    }
}
