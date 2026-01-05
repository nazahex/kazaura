import { createSolidLokat } from "@lokat/solid"
import { Bench } from "tinybench"
import { runAndSave } from "../tools/tinybench"

const small = createSolidLokat({
  initialLocale: "en",
  initialDict: { a: "A", b: "B", c: "C" },
  loadLocale: async () => ({ a: "A", b: "B", c: "C" }),
})
const largeDict = Object.fromEntries(
  Array.from({ length: 5000 }, (_, i) => [`key_${i}`, String(i)]),
)
const large = createSolidLokat({
  initialLocale: "en",
  initialDict: largeDict,
  loadLocale: async () => largeDict,
})

const bench = new Bench({ time: 100 })

bench.add("t(key) small dict", () => {
  small.t("a")
  small.t("b")
  small.t("c")
})

bench.add("t(key) large dict", () => {
  large.t("key_1")
  large.t("key_2500")
  large.t("key_4999")
})

await runAndSave("locale.bench", bench)
