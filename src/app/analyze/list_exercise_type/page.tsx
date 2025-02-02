"use client";
import { useContext } from "react";
import { DataContext } from "../../DataContext";

export default function ExerciseTypeList() {
    const { exerciseType } = useContext(DataContext);

    return (
        <div className="flex px-[40px] py-[40px] gap-5 flex-col items-start flex-shrink-0">
            <h1 className="text-xl font-bold">List of Exercise Types:</h1>
            <ul className="font-bold gap-3 px-1 list-disc">
                {exerciseType.map((item, key) => (
                    <li key={key}>{item ? item.description : " "}</li>
                ))}
            </ul>
        </div>
    );
}
