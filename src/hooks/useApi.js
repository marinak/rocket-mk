import { useState, useRef } from 'react'
import axios from 'axios'

export default (url, maxDuration) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(new AbortController());
    const timeoutRef = useRef()

    const forcedCancel = useRef();
    forcedCancel.current = false;

    const abort = () => {
        controller.abort();
        clearTimeout(timeoutRef);
        forcedCancel.current = true;
    }

    const request = async () => {
        setLoading(true);
        setError('');
        clearTimeout(timeoutRef.current)
        timeoutRef.current = maxDuration ? setTimeout(() => {
            abort();
            setError('This took too long');
        }, maxDuration * 1000) : -1;
        try {
            const response = await axios.request({
                signal: controller.signal,
                url
            });
            setData(response.data);
        } catch (error) {
            !forcedCancel.current && setError(error.message);
        } finally {
            setLoading(false);
            clearTimeout(timeoutRef.current);
            setController(new AbortController());
        }
    };

    return { request, data, error, loading, abort };
}
