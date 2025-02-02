"use client";
import { useContext } from "react";
import { DataContext } from "../../DataContext";

export default function EventTypeList() {
    const { eventType } = useContext(DataContext);

    return (
        <div className="flex px-[40px] py-[40px] gap-5 flex-col items-start flex-shrink-0">
            <h1 className="text-xl font-bold">List of Event Types:</h1>
            <ul className="font-bold gap-2 px-1 w-full">
                {eventType.map((item, key) =>
                    item ? (
                        <li
                            key={key}
                            className={`p-2 my-1 w-full text-center`}
                            style={{ backgroundColor: item.color }}
                        >
                            {item.description}
                        </li>
                    ) : (
                        " "
                    )
                )}
            </ul>
        </div>
    );
}
