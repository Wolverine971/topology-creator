<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="true" :clipped="true" fixed app>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <!-- <v-app-bar-nav-icon v-if="!selection.length"></v-app-bar-nav-icon> -->
      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-btn
            color="secondary"
            text
            v-bind="attrs"
            :class="{ 'x-small': $vuetify.breakpoint.mobile }"
            v-on="{ ...menu }"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <router-link custom :to="{ name: 'entities' }" v-slot="{ navigate }">
            <v-list-item @click="navigate">
              <v-list-item-content>
                <v-list-item-title v-text="'Entities'" />
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link custom :to="{ name: 'index' }" v-slot="{ navigate }">
            <v-list-item @click="navigate">
              <v-list-item-content>
                <v-list-item-title v-text="'Index'" />
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
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
  methods: {
    home() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
