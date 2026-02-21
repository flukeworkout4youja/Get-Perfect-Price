// ===== Get Elements =====
const costInput = document.getElementById("cost");
const extraInput = document.getElementById("extra");
const feeInput = document.getElementById("fee");
const profitInput = document.getElementById("profit");

const sellingPriceEl = document.getElementById("sellingPrice");
const netProfitEl = document.getElementById("netProfit");
const minPriceEl = document.getElementById("minPrice");

// ===== Calculate =====
function calculate() {
  const cost = parseFloat(costInput.value) || 0;
  const extra = parseFloat(extraInput.value) || 0;
  const feeRate = (parseFloat(feeInput.value) || 0) / 100;
  const profitRate = (parseFloat(profitInput.value) || 0) / 100;

  const totalCost = cost + extra;
  const remaining = 1 - feeRate - profitRate;

  if (remaining <= 0) {
    sellingPriceEl.textContent = "฿ —";
    netProfitEl.textContent = "฿ —";
    minPriceEl.textContent = "฿ —";
    return;
  }

  const sellingPrice = totalCost / remaining;
  const feeAmount = sellingPrice * feeRate;
  const netProfit = sellingPrice - totalCost - feeAmount;
  const minPrice = totalCost / (1 - feeRate);

  sellingPriceEl.textContent = "฿ " + sellingPrice.toFixed(2);
  netProfitEl.textContent = "฿ " + netProfit.toFixed(2);
  minPriceEl.textContent = "฿ " + minPrice.toFixed(2);
}

// ===== Input Listeners =====
[costInput, extraInput, feeInput, profitInput].forEach(input => {
  input.addEventListener("input", calculate);
});

// ===== Language System =====
const translations = {
  en: {
    inputTitle: "Pricing Inputs",
    resultTitle: "Recommended Price",
    costLabel: "Product Cost (฿)",
    extraLabel: "Additional Cost (฿)",
    feeLabel: "Platform Fee (%)",
    profitLabel: "Target Profit (%)",
    netProfit: "Net Profit / Unit",
    minimumPrice: "Minimum Safe Price",
    note: "Calculated including platform fee and target profit."
  },
  th: {
    inputTitle: "ตั้งราคาขายอย่างแม่นยำ",
    resultTitle: "ราคาที่ควรตั้ง",
    costLabel: "ต้นทุนสินค้า (฿)",
    extraLabel: "ค่าใช้จ่ายเพิ่มเติม (฿)",
    feeLabel: "ค่าธรรมเนียมแพลตฟอร์ม (%)",
    profitLabel: "เป้ากำไร (%)",
    netProfit: "กำไรสุทธิ / ชิ้น",
    minimumPrice: "ราคาขั้นต่ำ (ไม่ขาดทุน)",
    note: "คำนวณรวมค่าธรรมเนียมแพลตฟอร์มและกำไรที่ตั้งไว้"
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

document.getElementById("enBtn").addEventListener("click", () => setLanguage("en"));
document.getElementById("thBtn").addEventListener("click", () => setLanguage("th"));

// ===== Default Load =====
setLanguage("en");
calculate();
