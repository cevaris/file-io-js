function logError(err: Error): void {
    console.error(err);
}

function logMessage(message: string): void {
    console.log(message);
}

export default { logError, logMessage }