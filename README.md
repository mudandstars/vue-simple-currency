# Simple Vue3 Currency Input

[![npm Version](https://badgen.net/npm/v/vue-simple-currency?color=green)](https://www.npmjs.com/package/vue-simple-currency)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/mudandstars/vue-simple-currency/ci.yml?branch=master&label=tests&style=flat-square)](https://github.com/mudandstars/vue-simple-currency/actions?query=workflow%3Arun-tests+branch%3Amain)

This package provides a HTML input element that works for the Euro (€) currency.

## Installation

You can install the package via composer:

```bash
npm i -S vue-simple-currency
```

## Usage (VS Code)

1. Use in your project (probably a custom currency input component) and assign a v-model ref of type number
2. The input handles all user inputs and updates the ref with the cent-value

```jsx
<template>
    <CurrencyInputVue v-model="myNumberRef" />
</template>
```
