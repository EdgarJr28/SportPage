export const convertTimestamp = (timestamp) => {
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
    return new Date(milliseconds);
};