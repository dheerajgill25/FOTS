import crashlytics from '@react-native-firebase/crashlytics';
class CrashReporter {
    async setUserId(uid: string){
        await crashlytics().setUserId(uid);
    }
     recordError(error: any){
        crashlytics().recordError(error);
    }
}
const CrashReporterInstance = new CrashReporter();
export default CrashReporterInstance;