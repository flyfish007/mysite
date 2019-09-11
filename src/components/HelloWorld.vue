<template>
  <div class="row">


    <draggable
      class="list-group"
      tag="ul"
      v-model="list"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" name="flip-list">
        <li
          class="list-group-item"
          v-for="(element,index) in list"
          :key="index+1"
        >
          {{ element }}
        </li>
      </transition-group>
    </draggable>

    {{list}}
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  export default {
    name: "transition-example",
    display: "Transition",
    order: 6,
    components: {
      draggable
    },
    data() {
      return {
        list: [1,2,3,4]
      };
    },
    methods: {

    }
  };
</script>

<style>
  .button {
    margin-top: 35px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group span{ display: flex; flex-wrap: wrap; width:500px; margin: 0 auto; margin:0; padding:0;}
  .list-group-item {
    cursor: move; width:50%; text-align: center; list-style: none; padding:50px 0; text-align: center; background: #eee;
  }

</style>
