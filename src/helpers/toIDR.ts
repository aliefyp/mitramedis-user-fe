function toIDR(number: number) {
  const formatted = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}).format(number);
  return formatted;
}

export default toIDR
