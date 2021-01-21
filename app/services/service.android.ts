import { Application } from "@nativescript/core";
import { RECEIVER_CLASSNAME } from "./receiver.android";
export const SERVICE_CLASSNAME = "eu.test.mobileapp.Service";

declare const com: any;

@NativeClass
@JavaProxy("eu.test.mobileapp.Service")
class Service extends android.app.Service {
  private timerId: any;

  startBehaviour() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        console.log("PING");
      }, 1000);
    }
  }

  stopBehaviour() {
    clearInterval(this.timerId);
  }

  onBind(): android.os.IBinder {
    return null;
  }

  onCreate(): void {
    console.log("CREATE");
    super.onCreate();
    this.startBehaviour();

    // Start the foreground service (will ensure us to run in background from any situation, but a notification will always be there)
    const appIntent: android.content.Intent = new android.content.Intent(
      Application.android.context,
      com.tns.NativeScriptActivity.class
    );
    const pendingIntent: android.app.PendingIntent = android.app.PendingIntent.getActivity(
      Application.android.context,
      0,
      appIntent,
      0
    );
    const builder: android.app.Notification.Builder = new android.app.Notification.Builder(
      Application.android.context
    );
    builder
      .setContentText("My foreground service")
      .setSmallIcon(android.R.drawable.alert_light_frame)
      .setContentIntent(pendingIntent);
    if (android.os.Build.VERSION.SDK_INT >= 26) {
      const channel: android.app.NotificationChannel = new android.app.NotificationChannel(
        "persistence",
        "Service running indicator",
        android.app.NotificationManager.IMPORTANCE_LOW
      );
      const manager: android.app.NotificationManager = (<android.app.Activity>(
        Application.android.context
      )).getSystemService(android.content.Context.NOTIFICATION_SERVICE);
      channel.enableLights(false);
      channel.enableVibration(false);
      manager.createNotificationChannel(channel);
      builder.setChannelId("persistence");
    }
    const notification: android.app.Notification = builder.build();
    this.startForeground(13, notification);
  }

  onStartCommand(
    intent: android.content.Intent,
    flags: number,
    startId: number
  ): number {
    return android.app.Service.START_REDELIVER_INTENT;
  }

  // Called when app is swiped away from recent views. onDestroy won't be called in that situation so let's call it ourself
  onTaskRemoved(intent: android.content.Intent): void {
    this.stopSelf();
  }

  // Called when app is stopped
  onDestroy(): void {
    super.onDestroy();
    this.stopBehaviour();

    // Instantiate receiver to restart service in background while app is not running
    const restartIntent = new android.content.Intent();
    restartIntent.setClassName(this, RECEIVER_CLASSNAME);
    this.sendBroadcast(restartIntent);
  }
}
