import EventChart from "./EventChart";
import ListOfLinks from "./ListOfLinks";
export default function Analyze() {
    return (
        <div className="flex px-[35px] py-[40px] gap-[40px] flex-col items-start flex-shrink-0">
            <EventChart />
            <ListOfLinks />
        </div>
    );
}
