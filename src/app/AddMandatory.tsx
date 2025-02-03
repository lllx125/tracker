import { getDayOfWeek, Time } from "./Time";

// add mandatory event from last week to this week on monday
export const AddMandatory = () => {
    // only add on monday
    //console.log(getDayOfWeek(Time()));
    if (getDayOfWeek(Time()) != "Mon") return;
};
