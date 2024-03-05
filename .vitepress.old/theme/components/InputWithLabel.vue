<script setup>
defineProps({
    modelValue: String,
    fieldName: String,
    label: String
})
defineEmits(['update:modelValue'])
</script>

<template>
    <div class="pt-6 pb-2 flex gap-2 items-center">
        <label :for="fieldName" class="text-sm font-medium">{{ label }}</label>
        <input
            :name="fieldName"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="font-mono text-sm border bg-gray-100 dark:bg-zinc-700 border-gray-400 dark:border-gray-600 border-solid focus:ring-2 focus:ring-blue-500 rounded-lg px-2.5 py-1"
        />
    </div>
</template>
