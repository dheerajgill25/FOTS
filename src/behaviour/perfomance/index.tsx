import React, { useEffect } from 'react';
import PerfomanceFunction from './PerfomanceService';
interface PerfomanceWatcherProps { };

const PerfomanceWatcher = ({ }: PerfomanceWatcherProps) => {
    useEffect(() => {
        PerfomanceFunction.startPerfomanceTrace()
    }, []);
    return <></>;
}
export default PerfomanceWatcher;