import CurrencyInput from '@/Components/CurrencyInput.vue'
import { fireEvent } from '@testing-library/dom'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import { VueNode } from '@vue/test-utils/dist/types'
import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'

// @vitest-environment jsdom

describe('CurrencyInput Caret is at the correct position', async () => {
    let originalSetSelectionRange: any
    beforeEach(() => {
        originalSetSelectionRange = HTMLInputElement.prototype.setSelectionRange

        Object.defineProperty(HTMLInputElement.prototype, 'selectionStart', {
            writable: true,
            value: 0,
        })

        Object.defineProperty(HTMLInputElement.prototype, 'selectionEnd', {
            writable: true,
            value: 0,
        })

        HTMLInputElement.prototype.setSelectionRange = function (start, end) {
            this.selectionStart = start
            this.selectionEnd = end
        }
    })

    afterEach(() => {
        HTMLInputElement.prototype.setSelectionRange = originalSetSelectionRange
    })

    let wrapper: VueWrapper<any>
    let inputElement: VueNode<HTMLInputElement>
    beforeEach(async () => {
        wrapper = mount(CurrencyInput)

        await wrapper.vm.$nextTick()

        inputElement = wrapper.find('input').element
    })

    test('setCursorPosition functions works as expected', async () => {
        wrapper.vm.setCursorPosition(1)

        expect(inputElement.selectionStart).toBe(1)
    })

    test('default caret position is before the comma', async () => {
        expect(inputElement.selectionStart).toBe(inputElement.value.indexOf(',00€'))
    })

    test('adding a value from the end sets the caret to the position before the comma', async () => {
        wrapper.vm.setCursorPosition(2)
        await fireEvent.input(inputElement, { target: { value: '105,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(inputElement.value.indexOf(',00€'))

        wrapper.vm.setCursorPosition(2)
        await fireEvent.input(inputElement, { target: { value: '100,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(inputElement.value.indexOf(',00€'))
    })

    test('removing a value from the end sets the caret to the start position', async () => {
        wrapper.vm.setCursorPosition(2)
        await fireEvent.input(inputElement, { target: { value: '10,00' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(inputElement.value.indexOf(',00€'))
    })

    it('deleting the last and only character sets the caret to the default position', async () => {
        await fireEvent.input(inputElement, { target: { value: ',00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(1)

        await fireEvent.input(inputElement, { target: { value: '0,00' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(1)
    })

    it('deleting everything sets the caret to the default position', async () => {
        await fireEvent.input(inputElement, { target: { value: '' } })
        expect(inputElement.selectionStart).toBe(inputElement.value.indexOf(',00€'))
    })

    it('adding a number so the caret would be moved because of the dot-format keeps the cursor there', async () => {
        wrapper.vm.setCursorPosition(1)
        await fireEvent.input(inputElement, { target: { value: '33,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(2)

        wrapper.vm.setCursorPosition(1)
        await fireEvent.input(inputElement, { target: { value: '301,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(2)

        wrapper.vm.setCursorPosition(2)
        await fireEvent.input(inputElement, { target: { value: '3051,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(4)

        wrapper.vm.setCursorPosition(3)
        await fireEvent.input(inputElement, { target: { value: '3.1051,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(4)

        wrapper.vm.setCursorPosition(5)
        await fireEvent.input(inputElement, { target: { value: '310.511,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(6)

        wrapper.vm.setCursorPosition(4)
        await fireEvent.input(inputElement, { target: { value: '310.2511,00€' } })
        await wrapper.vm.$nextTick()
        expect(inputElement.selectionStart).toBe(6)
    })
})
