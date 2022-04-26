<template>
  <div :class='$style.root'>
    <h1 class='h1 text-center '>
      {{ id ? 'Редактирование записи' : 'Создание записи' }}
    </h1>
    <div :class='$style.form'>
      <VForm
        class='mt-7'
        ref='form'
        lazy-validation
      >
        <VTextField
          v-model='form.name'
          :rules='degreeRules'
          label='Название предмета'
          required
        />

        <VBtn
          depressed
          color='primary'
          class='mt-7'
          :disabled='!isValid'
          @click='onSubmit'
        >
          Сохранить
        </VBtn>

        <RouterLink tag='button' class='ml-5' :to="{ name: 'DegreesList' }">
          <VBtn
            depressed
            color='warning'
            class='mt-7'
          >
            Все группы
          </VBtn>
        </RouterLink>
      </VForm>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    id: { type: String }
  },

  data() {
    return {
      form: {
        id: '',
        name: '',
      },

      degreeRules: [v => !!v || 'Обязательное поле'],
    };
  },

  computed: {
    isValid: function() {
      return !!this.form.name;
    },

    degree: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'degrees/itemById'
    })
  },
  watch: {
    degree: function() {
      Object.keys(this.degree).forEach(key => {
        this.form[key] = this.degree[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const degree = {
        id: this.form.id,
        name: this.form.name,
      };
      this.id ?
        this.$store.dispatch('degrees/updateItem', degree) :
        this.$store.dispatch('degrees/createItem', degree);

      this.$router.push({ name: 'DegreesList' });
    }
  },

  created() {
    this.$store.dispatch('degrees/fetchItems');
  }
};
</script>

<style module lang='scss'>
.root {
  .form {
    max-width: 390px;
  }
}
</style>
