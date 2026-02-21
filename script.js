const costInput = document.getElementById("cost");
const extraInput = document.getElementById("extra");
const feeInput = document.getElementById("fee");
const profitInput = document.getElementById("profit");

const sellingPriceEl = document.getElementById("sellingPrice");
const netProfitEl = document.getElementById("netProfit");
const minPriceEl = document.getElementById("minPrice");

function calculate() {
  const cost = parseFloat(costInput.value) || 0;
  const extra = parseFloat(extraInput.value) || 0;
  const fee = (parseFloat(feeInput.value) || 0) / 100;
  const profit = (parseFloat(profitInput.value) || 0) / 100;

  const totalCost = cost + extra;

  if (fee + profit >= 1) return;

  const sellingPrice = totalCost / (1 - fee - profit);
  const netProfit = sellingPrice * profit;
  const minPrice = totalCost / (1 - fee);

  sellingPriceEl.textContent = "฿ " + sellingPrice.toFixed(2);
  netProfitEl.textContent = "฿ " + netProfit.toFixed(2);
  minPriceEl.textContent = "฿ " + minPrice.toFixed(2);
}

[costInput, extraInput, feeInput, profitInput].forEach(input =>
  input.addEventListener("input", calculate)
);

/* Language System */
const translations = {
  en: {
    inputTitle: "Pricing Inputs",
    resultTitle: "Recommended Price",
    costLabel: "Product Cost (฿)",
    extraLabel: "Additional Cost (฿)",
    feeLabel: "Platform Fee (%)",
    profitLabel: "Target Profit (%)",
    recommended: "Selling Price",
    netProfit: "Net Profit / Unit",
    minimumPrice: "Minimum Safe Price",
    note: "Calculated including platform fee and target profit."
  },
  th: {
    inputTitle: "ราคาขายที่ควรตั้ง (หลังหักค่าธรรมเนียมแล้ว)",
    resultTitle: "ราคาขายที่ควรตั้ง    costLabel: "ต้นทุนสินค้า (฿)",
    extraLabel: "ค่าใช้จ่ายเพิ่มเติม (฿)",
    feeLabel: "ค่าธรรมเนียมแพลตฟอร์ม (%)",
    profitLabel: "เป้ากำไร (%)",
    recommended: "ราคาขายที่ควรตั้ง",
    netProfit: "กำไรสุทธิต่อชิ้น",
    minimumPrice: "ราคาขั้นต่ำที่ปลอดภัย",
    note: "คำนวณรวมค่าธรรมเนียมและกำไรที่ต้องการแล้ว"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });

  document.getElementById("enBtn").classList.toggle("active", lang === "en");
  document.getElementById("thBtn").classList.toggle("active", lang === "th");
}

document.getElementById("enBtn").onclick = () => setLanguage("en");
document.getElementById("thBtn").onclick = () => setLanguage("th");
