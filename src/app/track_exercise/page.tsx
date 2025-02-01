"use client";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { Button, Input } from "@aws-amplify/ui-react";
import { Time } from "../Time";

//create client
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
const client = generateClient<Schema>();

export default function TrackExercise() {
    // obtain data base from the layout
    const { exercise, setExercise, exerciseType, setExerciseType } =
        useContext(DataContext);
    // variables in the form
    const [type, setType] = useState("");
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");

    // create a new data in the exercise database
    const createExercise = async () => {
        if (type == "" || value == 0) {
            return;
        }
        const { data: newExercise } = await client.models.Exercise.create({
            time: Time(),
            typeID: type,
            value,
        });
        // append the new data to the front of the current list of exercise so that no refetching and ordering is needed
        if (newExercise) {
            setExercise((prevItems) => [newExercise, ...prevItems]);
        }
    };
    // create a new data in the exerciseType database
    const createExerciseType = async () => {
        if (description == "") {
            return;
        }
        const { data: newExerciseType } =
            await client.models.ExerciseType.create({
                description,
            });
        // append the new data to the front of the current list of exercise so that no refetching and ordering is needed
        if (newExerciseType) {
            setExerciseType((prevItems) => [newExerciseType, ...prevItems]);
        }
    };
    const deleteExercise = async () => {
        await client.models.Exercise.delete({ id: exercise[0].id });
        setExercise((prevItems) => prevItems.slice(1));
    };
    return (
        <div className="flex px-[40px] py-[40px] gap-[40px] flex-col items-start flex-shrink-0">
            <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
                <h1 className="self-center font-extrabold text-xl">
                    Track Exercise
                </h1>
                <h3 className="font-bold">Exercise Type</h3>
                <select
                    className="w-full"
                    onChange={(event) => setType(event.target.value)}
                    defaultValue={""}
                >
                    <option value="" disabled hidden>
                        Select an option
                    </option>
                    {exerciseType.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.description}
                        </option>
                    ))}
                </select>
                <h3 className="font-bold">Value</h3>
                <Input
                    placeholder="Value"
                    className="w-full"
                    onChange={(event) => setValue(parseInt(event.target.value))}
                />
                <Button
                    className="w-full bg-green-300 active:bg-green-600"
                    onClick={() => createExercise()}
                >
                    Log
                </Button>
            </div>
            <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
                <h1 className="self-center font-extrabold text-xl">
                    Add Exercise Type
                </h1>
                <h3 className="font-bold">Exercise Type</h3>
                <Input
                    placeholder="Type"
                    className="w-full"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <Button
                    className="w-full bg-green-300 active:bg-green-600"
                    onClick={() => createExerciseType()}
                >
                    Add
                </Button>
            </div>
            <div className="flex gap-[10px] flex-col items-start w-full flex-shrink-0 border-black border-2 rounded p-2">
                <h1 className="self-center font-extrabold text-xl">
                    Last Exercise:
                </h1>
                <h3 className="font-bold">
                    {exercise[0]
                        ? exerciseType.find(
                              (item: { id: string }) =>
                                  item.id == exercise[0].typeID
                          )?.description +
                          " " +
                          exercise[0].value +
                          " at " +
                          exercise[0].time.split("T")[0]
                        : "Fetching Data..."}
                </h3>
                <Button
                    className="w-full bg-red-300 active:bg-red-600"
                    onClick={() => deleteExercise()}
                >
                    Delete This Record
                </Button>
            </div>
        </div>
    );
}
