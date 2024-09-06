// useFetchContract.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchContract = (dept) => {
    const [contracts, setContracts] = useState([]);

    const fetchContract = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/contract/dept/${dept}`);
            setContracts(response.data.data);
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
    }, [dept]);

    useEffect(() => {
        fetchContract();
    }, [fetchContract]);

    return contracts;
};

export default useFetchContract;
