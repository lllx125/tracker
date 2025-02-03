"use client";
import { Button, Input } from "@aws-amplify/ui-react";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

//create client
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddEventTypeForm() {
    const { setEventType } = useContext(DataContext);
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");

    const createEventType = async () => {
        if (description == "" || color == "") {
            return;
        }
        const { data: newEventType } = await client.models.EventType.create({
            description,
            color,
        });
        // append the new data to the front of the current list of event so that no refetching and ordering is needed
        if (newEventType) {
            setEventType((prevItems) => [newEventType, ...prevItems]);
        }
        setDescription("");
        setColor("");
    };
    // add an event type to the data base
    return (
        <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
            <h1 className="self-center font-extrabold text-xl">
                Add Event Type
            </h1>
            <h3 className="font-bold">Event Type</h3>
            <Input
                placeholder="Type"
                className="w-full"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            {/* set the color of the block to the color you enter */}
            <div className="flex gap-3 items-center">
                <h3 className="font-bold">Event Color</h3>
                <div
                    className={`w-5 h-5 border-2 border-black`}
                    style={{ backgroundColor: color }}
                ></div>
            </div>
            <Input
                placeholder="Color"
                className="w-full"
                value={color}
                onChange={(event) => setColor(event.target.value)}
            />
            <Button
                className="w-full bg-green-300 active:bg-green-600"
                onClick={() => createEventType()}
            >
                Add
            </Button>
        </div>
    );
}
