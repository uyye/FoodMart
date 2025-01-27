const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Tetap sebagai angka

// Rentang tanggal bulan saat ini
const startDate = `${year}-${month}-01`;
const endDate = new Date(year, month, 1).toISOString().split('T')[0]; // Tanggal akhir bulan

console.log(startDate); // "2025-01-01"
console.log(endDate); // "2025-01-31"
