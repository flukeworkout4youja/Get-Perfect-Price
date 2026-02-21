function calculate() {
  const cost = parseFloat(costInput.value) || 0;
  const extra = parseFloat(extraInput.value) || 0;
  const feeRate = (parseFloat(feeInput.value) || 0) / 100;
  const profitRate = (parseFloat(profitInput.value) || 0) / 100;

  const totalCost = cost + extra;

  const remaining = 1 - feeRate - profitRate;

  // ป้องกันกรณีเปอร์เซ็นต์เกิน 100%
  if (remaining <= 0) {
    sellingPriceEl.textContent = "—";
    netProfitEl.textContent = "—";
    minPriceEl.textContent = "—";
    return;
  }

  // ราคาขายที่ถูกต้อง
  const sellingPrice = totalCost / remaining;

  // ค่าธรรมเนียมจริง (คิดจากราคาขาย)
  const feeAmount = sellingPrice * feeRate;

  // กำไรสุทธิจริง (เงินที่เหลือหลังหักทุกอย่าง)
  const netProfit = sellingPrice - totalCost - feeAmount;

  // ราคาขั้นต่ำ (ไม่ขาดทุน แต่ยังมีค่าธรรมเนียม)
  const minPrice = totalCost / (1 - feeRate);

  sellingPriceEl.textContent = "฿ " + sellingPrice.toFixed(2);
  netProfitEl.textContent = "฿ " + netProfit.toFixed(2);
  minPriceEl.textContent = "฿ " + minPrice.toFixed(2);
}
