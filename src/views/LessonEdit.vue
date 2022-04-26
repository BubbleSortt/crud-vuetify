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
          :rules='lessonRules'
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

        <RouterLink tag='button' class='ml-5' :to="{ name: 'LessonsList' }">
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

      lessonRules: [v => !!v || 'Обязательное поле'],
    };
  },

  computed: {
    isValid: function() {
      return !!this.form.name;
    },

    lesson: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'lessons/itemById'
    })
  },
  watch: {
    lesson: function() {
      Object.keys(this.lesson).forEach(key => {
        this.form[key] = this.lesson[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const post = {
        id: this.form.id,
        name: this.form.name,
      };
      this.id ?
        this.$store.dispatch('lessons/updateItem', post) :
        this.$store.dispatch('lessons/createItem', post);

      this.$router.push({ name: 'LessonsList' });
    }
  },

  created() {
    this.$store.dispatch('lessons/fetchItems');
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
