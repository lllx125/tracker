import AddEventForm from "./AddEventForm";
import AddEventTypeForm from "./AddEventTypeForm";
import StartEvent from "./StartEvent";

export default function TrackTime() {
    return (
        <div className="flex px-[40px] py-[40px] gap-[20px] flex-col items-start flex-shrink-0">
            <StartEvent />
            <AddEventForm />
            <AddEventTypeForm />
        </div>
    );
}
