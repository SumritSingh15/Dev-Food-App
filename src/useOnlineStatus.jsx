import React, { useEffect, useState } from 'react'

const useOnlineStatus = () => {
    const [onlinestatus, SetOnlineStatus] = useState(navigator.onLine);

    useEffect(() => {
        window.addEventListener("online", () => {
            SetOnlineStatus(true);
        })

        window.addEventListener("offline", () => {
            SetOnlineStatus(false);
        })
    }, [])

    return onlinestatus;
}

export default useOnlineStatus
