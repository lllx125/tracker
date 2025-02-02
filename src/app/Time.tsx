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
