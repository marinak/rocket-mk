import { useState, useRef, useEffect } from 'react'

export default (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const controllerRef = useRef(new AbortController());
    const cancel = () => {
        controllerRef.current.abort();
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await axios.request({
                    data: payload,
                    signal: controllerRef.current.signal,
                    method,
                    url,
                });
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { cancel, data, error, loading };
}
