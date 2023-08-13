import CurrencyInput from '@/Components/CurrencyInput.vue'
import { fireEvent } from '@testing-library/dom'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, test } from 'vitest'

// @vitest-environment jsdom

    test('default value correctly sets local state', async () => {
       const wrapper = mount(CurrencyInput, {
            props: {
                modelValue: 35_000_00
            }
        })

        const inputElement = wrapper.find('input')
        expect(inputElement.element.value).toBe('35.000,00€')
    })
