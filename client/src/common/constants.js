const currencyTypes = [
  { value: 'TRY', label: 'TRY' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'JPY', label: 'JPY' }
];

const paymentMethods = [{ value: 'Kredi Kartı' }, { value: 'Nakit' }, { value: 'Havale' }, { value: 'Çek' }];

const sectors = [
  { name: 'Tarım, Ormancılık ve Balıkçılık' },
  { name: 'Madencilik ve Taş Ocakçılığı' },
  { name: 'İmalat' },
  { name: 'Elektrik, Gaz, Buhar ve İklimlendirme Üretimi ve Dağıtımı' },
  { name: 'Su Temini; Kanalizasyon, Atık Yönetimi ve İyileştirme Faaliyetleri' },
  { name: 'İnşaat' },
  { name: 'Toptan ve Perakende Ticaret' },
  { name: 'Motorlu Kara Taşıtlarının ve Motosikletlerin Onarımı' },
  { name: 'Ulaştırma ve Depolama' },
  { name: 'Konaklama ve Yiyecek Hizmeti Faaliyetleri' },
  { name: 'Bilgi ve İletişim' },
  { name: 'Finans ve Sigorta Faaliyetleri' },
  { name: 'Gayrimenkul Faaliyetleri' },
  { name: 'Mesleki, Bilimsel ve Teknik Faaliyetler' },
  { name: 'İdari ve Destek Hizmet Faaliyetleri' },
  { name: 'Kamu Yönetimi ve Savunma; Zorunlu Sosyal Güvenlik' },
  { name: 'Eğitim' },
  { name: 'İnsan Sağlığı ve Sosyal Hizmet Faaliyetleri' },
  { name: 'Kültür, Sanat, Eğlence, Dinlence ve Spor' },
  { name: 'Diğer Hizmet Faaliyetleri' }
];
const unitOptions = [
  { label: 'Kilogram' },
  { label: 'Adet' },
  { label: 'Gram' },
  { label: 'Pound' },
  { label: 'Ounce' },
  { label: 'Litre' },
  { label: 'Mililitre' },
  { label: 'Parça' },
  { label: 'Kutu' },
  { label: 'Metrekare' },
  { label: 'Metreküp' },
  { label: 'Metre' },
  { label: 'Santimetre' },
  { label: 'Milimetre' },
  { label: 'Santimetrekare' },
  { label: 'Milimetrekare' }
];
export default { currencyTypes, paymentMethods, sectors, unitOptions };
