// convert to current time zone
export const Time = () => {
    return new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString();
};
