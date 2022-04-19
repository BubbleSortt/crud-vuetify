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
          v-model='form.speciality'
          :rules='specialityRules'
          label='Специальность группы'
          required
        />

        <VTextField
          v-model='form.name'
          :rules='nameRules'
          label='Название группы'
          required
        />

        <VTextField
          v-model='form.leader'
          :rules='leaderRules'
          label='Староста'
          required
        />

        <VTextField
          v-model='form.year'
          :rules='yearRules'
          label='Год поступления'
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

        <RouterLink tag='button' class='ml-5' :to="{ name: 'GroupsList' }">
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
        speciality: '',
        name: '',
        leader: '',
        year: '',
      },

      specialityRules: [v => !!v || 'Обязательное поле'],
      nameRules: [v => !!v || 'Обязательное поле'],
      leaderRules: [v => !!v || 'Обязательное поле'],
      yearRules: [
        v => !!v || 'Обязательное поле',
        v => !!+v || 'Можно использовать только числа'
      ]
    };
  },

  computed: {
    isValid: function() {
      return (
      this.form.speciality &&
      this.form.name &&
      this.form.leader &&
      (this.form.year && !!+this.form.year)
      );
    },

    group: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'groups/itemById'
    })
  },
  watch: {
    group: function() {
      Object.keys(this.group).forEach(key => {
        this.form[key] = this.group[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const group = {
        id: this.form.id,
        speciality: this.form.speciality,
        name: this.form.name,
        leader: this.form.leader,
        year: this.form.year
      };
      this.id ?
        this.$store.dispatch('groups/updateItem', group) :
        this.$store.dispatch('groups/createItem', group);

      this.$router.push({ name: 'GroupsList' });
    }
  },

  created() {
    this.$store.dispatch('groups/fetchItems');
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
