"use client";
import { useContext } from "react";
import { DataContext } from "../../DataContext";

export default function ExerciseList() {
    const { exercise, exerciseType } = useContext(DataContext);

    return (
        <div className="flex px-[40px] py-[40px] gap-5 flex-col items-start flex-shrink-0">
            <h1 className="text-xl font-bold">List of Exercises:</h1>
            <ul className="font-bold gap-3 px-1 list-disc">
                {exercise.map((item, key) => (
                    <li key={key}>
                        {item
                            ? exerciseType.find(
                                  (type: { id: string }) =>
                                      type.id == item.typeID
                              )?.description +
                              " " +
                              item.value +
                              " at " +
                              item.time.split("T")[0]
                            : "Fetching Data..."}
                    </li>
                ))}
            </ul>
        </div>
    );
}
