import crashlytics from '@react-native-firebase/crashlytics';
class CrashReporter {
    async setUserId(uid: string){
        await crashlytics().setUserId(uid);
    }
     recordError(error: any){
        crashlytics().recordError(error);
    }
    executeError (){
        crashlytics().log('Error on Load');
        crashlytics().crash();
    }

}
const CrashReporterInstance = new CrashReporter();
export default CrashReporterInstance;