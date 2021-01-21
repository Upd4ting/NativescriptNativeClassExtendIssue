<template lang="pug">
  Page.page-login(actionBarHidden="true")
    ScrollView(height='100%')
      StackLayout
        Label(text="Hello" width="90%" textWrap="true")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style scoped lang="scss"></style>
