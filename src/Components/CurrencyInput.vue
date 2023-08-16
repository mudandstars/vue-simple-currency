<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import formatCurrencyWithDots from '../utils/formatCurrencyWithDots'

const props = defineProps<{
    modelValue: number | null
}>()

const emit = defineEmits<{
    'update:modelValue': [newValue: number]
}>()

const localValue = ref<string>(props.modelValue ? `${(props.modelValue / 100).toFixed(0).toString()},00€` : '0,00€')
const inputRef = ref<HTMLInputElement>()
const lastAction = ref<null | 'added character' | 'removed character'>(null)

function handleChange(value: string) {
    const clearedValue = value[0] === '0' ? value.substring(1) : value

    localValue.value = clearedValue + '€'

    if (value[value.length - 1] === '€' && value.includes(',00')) {
        emitUpdate()

        if (value !== ',00€') {
            lastAction.value = 'added character'
        } else {
            lastAction.value = 'removed character'
        }
    }
}

function setCursorPosition(position: number | null) {
    const inputEl = inputRef.value

    if (inputEl && position !== null) {
        inputEl.focus()

        inputEl.setSelectionRange(position, position)
    }
}

onMounted(() => {
    nextTick(() => setCursorPosition(localValue.value.indexOf(',00€')))
})

watch(
    () => localValue.value,
    async () => {
        if (deletedComma(localValue.value)) {
            nextTick(() => setCursorPosition(inputRef.value?.selectionStart || null))
            localValue.value = localValue.value.substring(0, localValue.value.indexOf('00€€') + 1) + ',00€'
            lastAction.value = null
        }

        if (deletedLastElement(localValue.value)) {
            localValue.value = localValue.value.substring(0, localValue.value.indexOf(',') - 1) + ',00€'

            emitUpdate()

            if (!localValue.value.substring(0, localValue.value.indexOf(',')).length) {
                nextTick(() => setCursorPosition(1))
            } else {
                nextTick(() => setCursorPosition(localValue.value.indexOf(',00€')))
            }
            lastAction.value = 'removed character'
        }

        if (addedZero(localValue.value)) {
            localValue.value = localValue.value.substring(0, localValue.value.indexOf(',')) + '0,00€'

            emitUpdate()
            lastAction.value = 'added character'
        }

        if (enteredNumberAtTheEnd(localValue.value)) {
            localValue.value =
                localValue.value.substring(0, localValue.value.indexOf(',')) +
                localValue.value[localValue.value.length - 1] +
                ',00€'

            emitUpdate()

            nextTick(() => setCursorPosition(localValue.value.indexOf(',00€')))
            lastAction.value = 'added character'
        }

        if (!localValue.value) {
            emitUpdate()

            lastAction.value = 'removed character'
            nextTick(() => setCursorPosition(1))
        }

        // remove all non-digits except the ','
        localValue.value = localValue.value.replace(/[^0-9,]/g, '')
    }
)

function emitUpdate() {
    const value = centsValue(localValue.value)

    if (!isNaN(value)) {
        emit('update:modelValue', value)
    } else {
        emit('update:modelValue', 0)
    }
}

const deletedLastElement = (value: string) =>
    value[value.length - 1] === '€' && value[value.length - 2] === '0' && value[value.length - 3] !== '€'
const enteredNumberAtTheEnd = (value: string) =>
    !isNaN(parseInt(value[value.length - 1])) && value[value.length - 1] !== '0'
const deletedComma = (value: string) => value.includes('€€') && !value.includes(',')
const addedZero = (value: string) => value.includes('€0€')
const centsValue = (value: string) =>
    parseInt(value[0] === '0' ? value.substring(1) : value.split(',')[0].replaceAll('.', '')) * 100

const displayValue = () => {
    let clearedValue = localValue.value.substring(0, localValue.value.indexOf(','))

    const previousCaretPosition = inputRef.value?.selectionStart
    const addingDot =
        ((clearedValue.replace(/[^0-9,]/g, '').length - 1) / 3) % 1 === 0 && lastAction.value === 'added character'
    const removingDot =
        ((clearedValue.replace(/[^0-9,]/g, '').length + 1) / 3) % 1 === 0 && lastAction.value === 'removed character'

    if (previousCaretPosition) {
        nextTick(() => setCursorPosition(addingDot ? previousCaretPosition + 1 : previousCaretPosition))
        nextTick(() => setCursorPosition(removingDot ? previousCaretPosition - 1 : previousCaretPosition))
    }

    return `${formatCurrencyWithDots(clearedValue)},00€`
}
</script>

<template>
    <input
        ref="inputRef"
        type="text"
        placeholder="0.00"
        :value="displayValue()"
        @input="handleChange(($event.target as HTMLInputElement)?.value)"
    />
</template>
