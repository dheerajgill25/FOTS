// import perf, { firebase, FirebasePerformanceTypes } from '@react-native-firebase/perf';

// class PerfomanceService {
//     async startPerfomanceTrace(){
//         await firebase.perf().setPerformanceCollectionEnabled(true);
//     }
//     async hfTracePerfomance(identifier: string, attribute: string, attributeValue: string, metricName: string, metricValue: number) {
//         const trace = await perf().startTrace(identifier);
//         trace.putAttribute(attribute, attributeValue);
//         trace.putMetric(metricName, metricValue);
//         await trace.stop();
//     }
//     async getRequest(url:string, method:FirebasePerformanceTypes.HttpMethod, attribute?: string|any, attributeValue?: string|any,) {
//         const metric = perf().newHttpMetric(url, method);
//         metric.putAttribute(attribute, attributeValue);
//         await metric.start();
//         const response:any = await fetch(url);
//         metric.setHttpResponseCode(response.status);
//         metric.setResponseContentType(response.headers.get('Content-Type'));
//         metric.setResponsePayloadSize(response.headers.get('Content-Length'));
//         await metric.stop();
      
//         return response.json();
//       }
// }
// const PerfomanceFunction = new PerfomanceService();
// export default PerfomanceFunction;