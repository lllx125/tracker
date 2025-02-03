import type { Schema } from "../../amplify/data/resource";
type Event = Schema["Event"]["type"];
// convert to current time zone
export const Time = () => {
    return new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString();
};

export const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getUTCDay()]; // getUTCDay() ensures correct day regardless of timezone
};

export const convertToISO = (timeStr: string): string => {
    // Check if the input is already a valid ISO string
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (isoRegex.test(timeStr)) {
        return timeStr; // Already in ISO format, return as is
    }
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "";

    const now = new Date();

    // Create a UTC date with correct time
    const utcDate = new Date(
        Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes,
            0
        )
    );

    return utcDate.toISOString();
};

export const toHourMinute = (isotime: string): string => {
    const date = new Date(isotime);
    const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    return hour + ":" + minute;
};

export const toMonthDate = (isotime: string): string => {
    const date = new Date(isotime);
    const dateOfMonth =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const Month =
        date.getMonth() < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    return Month + "/" + dateOfMonth;
};

export const subtractMinutes = (isoTime: string, minutes: number): string => {
    const date = new Date(isoTime);
    date.setMinutes(date.getMinutes() - minutes);
    return date.toISOString();
};

export const getMinuteDifference = (iso1: string, iso2: string): number => {
    const date1 = new Date(iso1);
    const date2 = new Date(iso2);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        return 0;
    }

    const diffMs = Math.abs(date2.getTime() - date1.getTime()); // Difference in milliseconds
    return Math.floor(diffMs / 60000); // Convert to minutes
};

export const Future = () => {
    return new Date(Date.UTC(2030, 0, 1, 0, 0, 0)).toISOString();
};

export const getWeekRange = (n: number = 0) => {
    // Get the current date.
    const now = new Date();

    // Calculate how far today is from Monday.
    // JavaScript's getDay() returns 0 for Sunday, 1 for Monday, ... 6 for Saturday.
    const currentDay = now.getDay();
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    // Compute the Monday for the desired week (subtract n weeks from the current week).
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday - n * 7);
    monday.setHours(0, 0, 0, 0); // Start of the day

    // Compute the Sunday for that week.
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999); // End of the day
    return { monday, sunday };
};
/**
 * Filters and groups events by day for a specified week.
 *
 * @param {Array} events - An array of event objects, each with a `date` property in ISO string format.
 * @param {number} n - The number of weeks before the current week (n = 0 for current week).
 * @returns {Array[]} A two-dimensional array with 7 subarrays (Monday to Sunday) containing events.
 */
export const getWeekEvents = (events: Event[], n: number = 0) => {
    const { monday, sunday } = getWeekRange(n);
    // Initialize a 2D array with 7 subarrays (one for each day, Monday = index 0, ..., Sunday = index 6).
    const weekEvents: Event[][] = Array.from({ length: 7 }, () => []);

    // Loop over each event
    events.forEach((event) => {
        // Convert the event's ISO date string to a Date object
        const eventDate = new Date(event.endTime);

        // Check if the event's date is within the desired week.
        if (eventDate >= monday && eventDate <= sunday) {
            // Map eventDate.getDay() to an index where Monday = 0 and Sunday = 6.
            const dayIndex = (eventDate.getDay() + 6) % 7;
            weekEvents[dayIndex].push(event);
        }
    });

    return weekEvents;
};
