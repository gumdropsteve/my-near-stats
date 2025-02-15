<template>
  <Menu as="div" class="network-selector">
    <div>
      <!-- Network selector button -->
      <MenuButton class="network-selector__button">
        {{ network }}
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <!-- Network selector options -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="network-selector__menu">
        <div class="py-1">
          <MenuItem
            v-for="networkKey in networkKeys"
            :key="networkKey"
            v-slot="{ active }"
          >
            <a
              href="#"
              @click.prevent="network = networkKey"
              :class="[
                active
                  ? 'network-selector__option--active'
                  : 'network-selector__option--inactive',
                network === networkKey
                  ? 'network-selector__option--selected'
                  : '',
                'network-selector__option',
              ]"
              >{{ networkKey }}</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style lang="scss" scoped>
.network-selector {
  @apply relative inline-block text-left;

  &__button {
    @apply inline-flex
      justify-center
      w-full
      rounded-r-md
      shadow-sm
      px-4
      py-2
      bg-transparent
      text-sm
      font-medium
      border border-transparent
      leading-5
      bg-indigo-400 bg-opacity-25
      text-indigo-100
      placeholder-indigo-200
      hover:bg-indigo-500 hover:bg-opacity-25 hover:text-white
      focus:bg-white focus:bg-opacity-100 focus:text-gray-900 ring-0 outline-none
      sm:text-sm;
  }

  &__menu {
    @apply origin-top-right z-10 absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none;
  }

  &__option {
    @apply block px-4 py-2 text-sm;

    &--inactive {
      @apply text-gray-700;
    }

    &--active {
      @apply bg-gray-100 text-gray-900;
    }

    &--selected {
      @apply bg-indigo-500 text-white font-medium;
    }
  }
}
</style>

<script lang="ts">
import { Network, networks } from '@/services/near/networks';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { defineComponent, inject, Ref } from '@vue/runtime-core';
import { ChevronDownIcon } from 'heroicons-vue3/outline';

export default defineComponent({
  components: {
    Menu,
    MenuItem,
    MenuItems,
    MenuButton,
    ChevronDownIcon,
  },
  setup() {
    const networkKeys: Network[] = [Network.MAINNET, Network.TESTNET];
    const network = inject<Ref<Network>>('network');

    return {
      network,
      networks,
      networkKeys,
    };
  },
});
</script>
