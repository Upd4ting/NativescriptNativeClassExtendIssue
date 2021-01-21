import { SERVICE_CLASSNAME } from "./service.android";

export const RECEIVER_CLASSNAME = "eu.test.mobileapp.Receiver";

@NativeClass
@JavaProxy("eu.test.mobileapp.Receiver")
class Receiver extends android.content.BroadcastReceiver {
  onReceive(
    context: android.content.Context,
    intent: android.content.Intent
  ): void {
    console.log("RESTART INTENT RECEIVED");
    const serviceIntent = new android.content.Intent();
    serviceIntent.setClassName(context, SERVICE_CLASSNAME);
    context.startService(serviceIntent);
  }
}
