function error(err: Error): void {
    console.error(err);
}

function info(message: string): void {
    console.log(message);
}

export default { error, info }