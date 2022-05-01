<template>
  <div>
    <VDataTable
      :headers="[
          { text: 'ID', value: 'id' },
          { text: 'Фамилия', value: 'surname' },
          { text: 'Имя', value: 'name' },
          { text: 'Отчество', value: 'patronymic' },
          { text: 'Ставка', value: 'rate' },
          { text: 'Общее кол-во часов', value: 'totalHours' },
          { text: 'id должности', value: 'postId' },
          { text: 'id ученой степени', value: 'degreeId' },
          { text: 'Control', value: 'control', align: 'center', },
        ]"
      :items='items'
      :items-per-page='5'
      class='elevation-1'
    >

      <template v-slot:[`item.control`]='{ item }'>
        <RouterLink :to="{ name: 'TeacherEdit', params: { id: item.id } }">
          <VBtn
            depressed
            color='primary'
          >
            <v-icon small>
              mdi-pencil
            </v-icon>
          </VBtn>
        </RouterLink>

        <VBtn
          depressed
          color='error'
          class='ml-2 px-0'
          @click='callDialogDelete(item.id)'
        >
          <v-icon small>
            mdi-delete
          </v-icon>
        </VBtn>
      </template>
    </VDataTable>

    <RouterLink :to="{ name: 'LessonEdit' }">
      <VBtn
        depressed
        color='primary'
        class='mt-7'
      >
        Создать запись
      </VBtn>
    </RouterLink>

    <VDialog v-model='dialogDelete' max-width='600px'>
      <VCard class='text-center py-4'>
        <VCardTitle class='text-h5 justify-center mb-6'>Вы действительно хотите удалить запись?</VCardTitle>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color='info darken-1' @click='closeDialogDelete'>Отмена</VBtn>
          <VBtn color='error darken-1' @click='onClickDelete'>Удалить</VBtn>
          <VSpacer></VSpacer>
        </VCardActions>
      </VCard>
    </VDialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  data() {
    return {
      dialogDelete: false,
      editingId: -1,
    }
  },

  mounted() {
    this.$store.dispatch('teachers/fetchItems');
  },
  computed: {
    ...mapGetters({
      items: 'teachers/items',
    })
  },
  methods: {
    onClickDelete: function() {
      this.$store.dispatch('teachers/removeItem', this.editingId);
      this.dialogDelete = false;
      this.editingId = -1;
    },
    callDialogDelete: function(id) {
      this.dialogDelete = true;
      this.editingId = id;
    },
    closeDialogDelete: function() {
      this.dialogDelete = false;
      this.editingId = -1;
    }
  },
};
</script>

