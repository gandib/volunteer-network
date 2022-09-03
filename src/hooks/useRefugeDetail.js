import { useEffect, useState } from "react";

const useRefugeDetail = id => {
    const [refuge, setRefuge] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/refuge/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setRefuge(data));

    }, [id]);
    return [refuge, setRefuge];
}

export default useRefugeDetail;