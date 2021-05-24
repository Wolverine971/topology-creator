<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="true" :clipped="true" fixed app>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-toolbar-title v-text="'Topology Generator'" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
