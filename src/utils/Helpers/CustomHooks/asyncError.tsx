import React from "react"

export const useAsyncError = () => {
    const [_, setError] = React.useState();

    return React.useCallback(
        (e: any) => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};
