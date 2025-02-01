"use client";
import "./globals.css";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import HomeButton from "./HomeButton";
import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";

//create client
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource"; // Path to your backend resource definition

const client = generateClient<Schema>();

Amplify.configure(outputs);

//create schema types
type Event = Schema["Event"]["type"];
type EventType = Schema["EventType"]["type"];
type Exercise = Schema["Exercise"]["type"];
type ExerciseType = Schema["ExerciseType"]["type"];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //layout only has a home button, and set width to 390 (width of iphone)

    //store data in layout so that it does not need to fetch again

    //fetch data

    //initialize variables
    const [event, setEvent] = useState<Event[]>([]);
    const [eventType, setEventType] = useState<EventType[]>([]);
    const [exercise, setExercise] = useState<Exercise[]>([]);
    const [exerciseType, setExerciseType] = useState<ExerciseType[]>([]);
    //fetch data at loading the page
    useEffect(() => {
        fetchData();
    });
    useEffect(() => {
        console.log(exercise);
    }, [exercise]);
    // fetch data from the database
    const fetchData = async () => {
        const { data: events } = await client.models.Event.list();
        const { data: eventTypes } = await client.models.EventType.list();
        const { data: exercises } = await client.models.Exercise.list();
        const { data: exerciseTypes } = await client.models.ExerciseType.list();
        //sort them in from nearest in time to furthest in time
        setEvent(
            events.sort(
                (a, b) =>
                    new Date(b.endTime).getTime() -
                    new Date(a.endTime).getTime()
            )
        );
        setEventType(eventTypes);
        //sort them in from nearest in time to furthest in time
        setExercise(
            exercises.sort(
                (a, b) =>
                    new Date(b.time).getTime() - new Date(a.time).getTime()
            )
        );
        setExerciseType(exerciseTypes);
    };

    return (
        <html lang="en">
            <body className="w-[390px] bg-gray-50">
                <HomeButton />
                {/* give the variables to children via context */}
                <DataContext.Provider
                    value={{
                        event,
                        setEvent,
                        eventType,
                        setEventType,
                        exercise,
                        setExercise,
                        exerciseType,
                        setExerciseType,
                    }}
                >
                    {children}
                </DataContext.Provider>
            </body>
        </html>
    );
}
