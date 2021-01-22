<template lang="pug">
  Page.page-login(actionBarHidden="true")
    ScrollView(height='100%')
      StackLayout
        Label(text="Hello" width="90%" textWrap="true")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Application } from "@nativescript/core";

@Component
export default class extends Vue {
  mounted() {
    console.log("here");
    const context = Application.android.context;
    const serviceIntent = new android.content.Intent();
    serviceIntent.setClassName(context, "eu.test.mobileapp.Service");
    context.startService(serviceIntent);
  }
}
</script>

<style scoped lang="scss"></style>
