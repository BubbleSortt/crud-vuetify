<template>
  <div>
    <VDataTable
        :headers="[
          { text: 'ID', value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Surname', value: 'surname' },
          { text: 'Age', value: 'age' },
          { text: 'Control', value: 'control', align: 'center', },
        ]"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:[`item.control`]="{ item }">
        <RouterLink tag="button" :to="{ name: 'StudentEdit', params: { id: item.id } }" >
          <VBtn
              depressed
              color="primary"
          > Edit </VBtn>
        </RouterLink>

        <VBtn
            depressed
            color="error"
            class="ml-5"
            @click="onClickRemove(item.id)"
        > Remove </VBtn>
      </template>
    </VDataTable>
    <RouterLink :to="{ name: 'StudentEdit' }" >
      <VBtn
          depressed
          color="primary"
          class="mt-7"
      >
        Create
      </VBtn>
    </RouterLink>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created() {
    this.$store.dispatch('fetchItems');
  },
  computed: {
    ...mapGetters({
      items: 'items',
    })
  },
  methods: {
    onClickEdit: () => {

    },
    onClickRemove: function(id) {
      this.$store.dispatch('removeItem', id);
    },
  },
};
</script>

