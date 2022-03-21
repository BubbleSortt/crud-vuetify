<template>
  <v-app>
    <v-main>
      <VContainer>
        <router-view />
      </VContainer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
