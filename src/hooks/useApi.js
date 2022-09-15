import { useState } from 'react'
import axios from 'axios'

export default (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(new AbortController());

    const request = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.request({
                signal: controller.signal,
                url
            });
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setController(new AbortController());
        }
    };

    return { request, data, error, loading, controller };
}
