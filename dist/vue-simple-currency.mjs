import { defineComponent as x, ref as y, watch as V, openBlock as _, createElementBlock as C, createElementVNode as i } from "vue";
function b(o) {
  if (!o)
    return "0";
  const n = o.split("").reverse(), a = [];
  for (let t = 0; t < n.length; t += 3)
    a.push(
      n.slice(t, t + 3).reverse().join("")
    );
  return a.reverse().join(".");
}
const N = { class: "relative mt-2 rounded-md shadow-sm" }, O = ["value"], k = /* @__PURE__ */ i("div", { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" }, [
  /* @__PURE__ */ i("span", { class: "text-gray-500 sm:text-sm" }, "EUR")
], -1), I = /* @__PURE__ */ x({
  __name: "CurrencyInput",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(o, { emit: n }) {
    var c;
    const a = o;
    function t(e) {
      const u = e[0] === "0" ? e.substring(1) : e;
      l.value = u + "€", e[e.length - 1] === "€" && e.includes(",00") && (console.log(0, s(l.value)), r());
    }
    const l = y(((c = a.modelValue) == null ? void 0 : c.toString()) || "0,00€");
    V(
      () => l.value,
      async () => {
        m(l.value) && (l.value = l.value.slice(
          0,
          l.value.indexOf("00€€") + 1
        ) + ",00€"), g(l.value) && (l.value = l.value.slice(
          0,
          l.value.indexOf(",") - 1
        ) + ",00€", console.log(1, l.value, s(l.value)), r()), v(l.value) && (l.value = l.value.substring(
          0,
          l.value.indexOf(",")
        ) + "0,00€", console.log(2, l.value, s(l.value)), r()), p(l.value) && (l.value = l.value.slice(0, l.value.indexOf(",")) + l.value[l.value.length - 1] + ",00€", console.log(3, l.value, s(l.value)), r()), l.value = l.value.replace(/[^0-9,]/g, "");
      }
    );
    function r() {
      const e = s(l.value);
      isNaN(e) ? n("update:modelValue", 0) : n("update:modelValue", e);
    }
    const g = (e) => e[e.length - 1] === "€" && e[e.length - 2] === "0" && e[e.length - 3] !== "€", p = (e) => !isNaN(parseInt(e[e.length - 1])) && e[e.length - 1] !== "0", m = (e) => e.includes("€€") && !e.includes(","), v = (e) => e.includes("€0€"), s = (e) => parseInt(
      e[0] === "0" ? e.slice(1) : e.split(",")[0].replaceAll(".", "")
    ) * 100, f = () => {
      let e = l.value.slice(
        0,
        l.value.indexOf(",")
      );
      return `${b(e)},00€`;
    };
    return (e, u) => (_(), C("div", null, [
      i("div", N, [
        i("input", {
          type: "text",
          class: "block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          placeholder: "0.00",
          value: f(),
          onInput: u[0] || (u[0] = (h) => {
            var d;
            return t((d = h.target) == null ? void 0 : d.value);
          })
        }, null, 40, O),
        k
      ])
    ]));
  }
});
export {
  I as default
};
