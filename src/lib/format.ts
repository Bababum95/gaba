export function formatHeight(cm: number): string {
  return `${cm.toFixed(1)} cm`;
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)} kg`;
}

export function formatBirthDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function maskCardNumber(cardNumber: string): string {
  const last4 = cardNumber.slice(-4);
  return `•••• •••• •••• ${last4}`;
}

export function truncateWallet(wallet: string, chars = 8): string {
  if (wallet.length <= chars * 2 + 3) return wallet;
  return `${wallet.slice(0, chars)}…${wallet.slice(-chars)}`;
}

export function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
