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
          v-model='form.post'
          :rules='postRules'
          label='Должность'
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

        <RouterLink tag='button' class='ml-5' :to="{ name: 'PostsList' }">
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
        post: '',
      },

      postRules: [v => !!v || 'Обязательное поле'],
    };
  },

  computed: {
    isValid: function() {
      return !!this.form.post;
    },

    post: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'posts/itemById'
    })
  },
  watch: {
    post: function() {
      Object.keys(this.post).forEach(key => {
        this.form[key] = this.post[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const post = {
        id: this.form.id,
        post: this.form.post,
      };
      this.id ?
        this.$store.dispatch('posts/updateItem', post) :
        this.$store.dispatch('posts/createItem', post);

      this.$router.push({ name: 'PostsList' });
    }
  },

  created() {
    this.$store.dispatch('posts/fetchItems');
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
