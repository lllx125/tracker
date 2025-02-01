"use client";
import { createContext } from "react";
import type { Schema } from "../../amplify/data/resource";

//create schema types
type Event = Schema["Event"]["type"];
type EventType = Schema["EventType"]["type"];
type Exercise = Schema["Exercise"]["type"];
type ExerciseType = Schema["ExerciseType"]["type"];

//context
interface DataContextType {
    event: Event[];
    setEvent: React.Dispatch<React.SetStateAction<Event[]>>;
    eventType: EventType[];
    setEventType: React.Dispatch<React.SetStateAction<EventType[]>>;
    exercise: Exercise[];
    setExercise: React.Dispatch<React.SetStateAction<Exercise[]>>;
    exerciseType: ExerciseType[];
    setExerciseType: React.Dispatch<React.SetStateAction<ExerciseType[]>>;
}

//create context
export const DataContext = createContext<DataContextType>({
    event: [],
    setEvent: () => {},
    eventType: [],
    setEventType: () => {},
    exercise: [],
    setExercise: () => {},
    exerciseType: [],
    setExerciseType: () => {},
});
