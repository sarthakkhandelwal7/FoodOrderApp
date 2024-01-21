import { useCallback, useEffect, useState } from "react";

async function send_http_request(url, config) {
    const response = await fetch(url, config);
    const resp_data = await response.json();

    if (!response.ok) {
        throw Error(
            resp_data.message ||
                "Something went wrong failed to send a request."
        );
    }
    return resp_data;
}

export default function useHttp(url, config, initial_value) {
    const [data, setData] = useState(initial_value);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clear_data() {
        setData(initial_value);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const res_data = await send_http_request(url, {
                    ...config,
                    body: data,
                });
                setData(res_data);
            } catch (error) {
                setError(error.message || "Something went wrong!");
            }
            setIsLoading(false);
        },
        [url, config]
    );
    useEffect(() => {
        if (
            (config && (config.request === "GET" || !config.method)) ||
            !config
        ) {
            sendRequest();
        }
    }, [sendRequest, config]);
    return {
        data,
        isLoading,
        error,
        sendRequest,
        clear_data,
    };
}
