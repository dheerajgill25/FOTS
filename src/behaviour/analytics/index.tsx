import React, { useEffect } from 'react';
import  AnalyticsFunction  from './AnalyticsService';
interface AnalyticsWatcherProps { };

const AnalyticsWatcher = ({ }: AnalyticsWatcherProps) => {
    useEffect(() => {
        AnalyticsFunction.init();
        AnalyticsFunction.functionAppOpen();
    }, []);
    return <></>;
}
export default AnalyticsWatcher;