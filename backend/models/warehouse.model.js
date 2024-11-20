const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true }, // İlgili şirketin kimliği
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    }, // Depo kodu
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    }, // Depo adı
    description: { type: String, trim: true }, // Depo açıklaması
    status: { type: Boolean, default: true }, // Aktiflik durumu
    image: { type: String }, // Depo resmi URL'si
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      addressDetail: { type: String, trim: true },
    },
    contact: {
      phone: { type: String, required: true },
      phone2: { type: String },
      email: { type: String },
    },
    warehouseType: { type: String, required: true }, // Depo türü (örneğin, "Soğuk Depo", "Genel Depo")
    dimensions: {
      area: { type: Number, required: true }, // Alan (m²)
      capacity: { type: Number, required: true }, // Kapasite (ton)
      volume: { type: Number, required: true }, // Hacim (m³)
    },
    infrastructure: {
      rackCount: { type: Number, required: true }, // Raf sayısı
      gateCount: { type: Number, required: true }, // Kapı sayısı
      dockCount: { type: Number, required: true }, // Rıhtım sayısı
      parkingSpots: { type: Number }, // Park yeri sayısı
    },
    location: {
      googleMapsLink: { type: String }, // Google Maps adres linki
    },
    management: {
      managerName: { type: String }, // Yönetici adı
      managerContact: { type: String }, // Yönetici iletişim bilgileri
    },
    operations: {
      workingHours: { type: String }, // Çalışma saatleri
      securityLevel: { type: String }, // Güvenlik seviyesi
      securityFeatures: { type: [String] }, // Güvenlik özellikleri (örneğin, "Kamera", "Alarm")
      isClimateControlled: { type: Boolean, default: false }, // İklim kontrolü var mı
      temperatureRange: { type: String }, // Sıcaklık aralığı
    },
    costs: {
      operationalCost: { type: Number }, // Operasyonel maliyet
      maintenanceCost: { type: Number }, // Bakım maliyeti
    },
    notes: { type: String }, // Ek notlar
    zones: [
      {
        zoneCode: { type: String, required: true }, // Bölge kodu
        description: { type: String }, // Bölge açıklaması
        type: { type: String }, // Bölge türü (örneğin, "Soğuk Depo", "Tehlikeli Madde")
        capacity: { type: Number, required: true }, // Kapasite
        usedCapacity: { type: Number, default: 0 }, // Kullanılan kapasite
      },
    ],
    racks: [
      {
        rackCode: { type: String, required: true }, // Raf kodu
        zoneCode: { type: String, required: true }, // İlgili bölge kodu
        shelfCount: { type: Number, required: true }, // Raf sayısı
        capacity: { type: Number, required: true }, // Kapasite
        usedCapacity: { type: Number, default: 0 }, // Kullanılan kapasite
      },
    ],
    inventory: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // Ürün kimliği
        quantity: { type: Number, required: true }, // Miktar
        location: { type: String }, // Konum
        batchNumber: { type: String }, // Parti numarası
        expirationDate: { type: Date }, // Son kullanma tarihi
        status: { type: String }, // Durum
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
