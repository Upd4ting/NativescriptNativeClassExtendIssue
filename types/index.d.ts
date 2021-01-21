import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    // For modals to work
    $modal: any;
    nativeView: any;
    $navigateTo: any;
    $navigateBack: any;
    $showModal: any;
    $start: any;

    // Our stuff and plugins
    L: function;
    fonticon: function;
    $isAndroid: boolean;
    $isIOS: boolean;
    $locator: any;
    $v: any;
  }
}
