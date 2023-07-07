export const delay = (delayInms: number): Promise<number> => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}