# UI Dokümantasyonu

Bu dosya, arayüz tasarımına dair referansları ve düzen spesifikasyonlarını içerir.

## Wireframe ve Mockup Kaynakları
- **Screenshots/**: Yerel wireframe/mockup görüntüleri burada tutulur. Yeni ekran görüntülerini eklerken dosya adında tarih ve kısa açıklama kullanın (örn. `2024-06-15_main-menu.png`).
- **Figma**: Tasarımın güncel sürümü için paylaşım bağlantısı: `https://www.figma.com/file/PROJECT-ID/your-figma-file` (güncel bağlantıyı buraya ekleyin).

## HUD Yerleşimi
- **Health/EXP Bar**: Ekranın sol üst kısmında, health üstte, exp altta olacak şekilde çift katmanlı bar. Sağlıklı okunabilirlik için %10 iç boşluk ve minimum 200px genişlik önerilir.
- **Skill Cooldown İkonları**: Alt orta kısımda yatay sırada, 64px ikon + 8px aralık. Cooldown süresi ikonun sağ altına yarı saydam overlay olarak yazılır.
- **Mini-map**: Ekranın sağ üst köşesinde 180px kare; altına ping/quest uyarılarını yazacak 2 satırlık alan bırakılır.
- **Boss Health Bar**: Üst orta kısımda tam genişlikte ince bar (yükseklik ~32px), altında boss adı ve faz göstergesi için alan.

## Menü Akışı ve Navigasyon
- **Play** → doğrudan son kaydı/slot seçimini açar; onay sonrası oyuna geçiş.
- **Options** → alt sekmeler: Grafik, Ses, Kontroller. Her sekme sol menüden yukarı/aşağı oklarıyla, sağ tarafta içerik kartlarıyla gezilir.
- **Character** → karakter görünümü ve istatistik ekranı; sol/sağ oklar kozmetik slotlarını, Tab tuşu istatistik detay kartlarını değiştirir.
- **Inventory** → grid tabanlı eşya listesi; WASD veya yön tuşlarıyla hücreler arası gezinme, Enter ile detay/kuşan, Backspace ile çıkış.
- Genel navigasyon girişleri: `Esc` (geri/üst menü), `Enter` (onay/seç), `Tab` (sekme/alt panel değişimi), ok tuşları veya WASD (odaklı öğe seçimi).

## Klasör Yapısı
- `Assets/UI/Screenshots/`: Wireframe ve mockup PNG/JPEG dosyaları.
- `Assets/UI/README.md`: Bu dokümantasyon.
