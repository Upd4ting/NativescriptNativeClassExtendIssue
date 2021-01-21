import { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "eu.test.mobileapp",
  appResourcesPath: "app/App_Resources",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none",
  },
  name: "NativescriptNativeClassExtendIssue",
  version: "1.0.0",
  appPath: "app",
} as NativeScriptConfig;
