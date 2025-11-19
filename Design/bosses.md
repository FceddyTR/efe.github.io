# Boss Tasarımı ve İlerleme Kuralları

## Seviye Atlama Koşulları ve Ödül Dağılımı
- **Gereksinimler:** Oyuncu seviye atlamak için iki koşulu aynı anda sağlamalı: (1) mevcut tier'ın ana boss'unu yenmek, (2) tier'a özel minimum EXP eşiğini karşılamak. EXP eşiği = `1000 + (500 * mevcut seviye)`. Tier boss'u yenilmeden toplanan fazla EXP bankada tutulur ve koşul tamamlandığında otomatik uygulanır.
- **Ödül Yapısı:**
  - **Tier Boss Zaferi:** Benzersiz ekipman parçası (destansı kalite), 1 yetenek puanı, 500 ham malzeme, 10% hareket hızı artışı (20 dakikalık buff).
  - **Seviye Atlama:** 1 stat puanı, tam can/mana yenileme, rastgele nadir materyal dropları (1-3 adet, seviye ile ölçeklenir).
  - **İlerleme Kilidi:** Tier boss'u yenilmeden sonraki bölgeye giriş kilitli kalır; seviye eşiği doldurulmuş olsa bile boss zaferi gerekir.

## Bölge ve Boss Listesi
Aşağıdaki listede her bölge/tier için boss'ların faz yapısı, telegraph ipuçları ve zayıf noktaları özetlenmiştir.

### Tier 1 – Sisli Orman
- **Köksap Bekçisi**
  - Faz: 2 (faz geçişi %50 can).
  - Telegraph: Toprağın hafifçe kabarması ve yeşil ışık halkası (kök fırlatma); gövdede parlayan reçine damlaları (büyük süpürme).
  - Zayıf Noktalar: Gövdedeki reçine damlası (uzak saldırı ile kırılabilir), yere saplanan köklerin altındaki toprak yumuşak noktaları.
- **Ruh Avcısı** (opsiyonel mini-boss)
  - Faz: 1.
  - Telegraph: Sis yoğunlaşması ve üç kısa ruh çığlığı (gizli yaklaşma); gölgede mor kıvılcımlar (dash saldırısı).
  - Zayıf Noktalar: Omzundaki ruh kristali, çığlık sonrası ortaya çıkan ruh küreleri (vurulduğunda sersemler).

### Tier 2 – Kızıl Çöl
- **Kum Leviathanı**
  - Faz: 3 (faz geçişleri %66/%33).
  - Telegraph: Kum üzerinde geniş dairesel çatlaklar (yerden çıkan kuyruk); sıcak hava titreşimi ve kırmızı toz halesi (ateş püskürtme); kumda hızlı zikzak izleri (tünel dash).
  - Zayıf Noktalar: Baş segmentindeki göz plakası (kısa süreli ortaya çıkar), ateş püskürtme öncesi şişen boğaz kesesi.
- **Çöl Valisi Raksar**
  - Faz: 2.
  - Telegraph: Kısa süreli kum fırtınası hortumu (mızrak fırlatma), zırhın kızarması ve metal tınısı (yüksek hasarlı güç vuruşu).
  - Zayıf Noktalar: Güç vuruşu sonrası kızarmış zırh plakaları (aşırı ısınıp kırılabilir), arka taraftaki yakıt tankı.

### Tier 3 – Fırtına Zirvesi
- **Gök Gürültüsü Titanı**
  - Faz: 3 (elektrik kalkanı %75 ve %35 canlarda değişir).
  - Telegraph: Kollarında mavi ark kıvılcımları (şok dalgası), yer üzerinde genişleyen halka şeklinde kıvılcımlar (alan kontrol), göğe kaldırdığı mızrak ve yoğun bulutlanma (şimşek çağırma).
  - Zayıf Noktalar: Şimşek çağırma sırasında mızrak ucu, kalkan kapanırken göğüs zırhındaki enerji çekirdeği.
- **Boranhhan** (final boss)
  - Faz: 4 (son fazda öfke modu).
  - Telegraph: Ejderha başlarında eşzamanlı nefes alışı ve çene ışığı (üç yönlü alev konisi); kanatların iki kez çırpılması (dairesel hava bıçağı); gövdede parlak runik çizgiler (meteorit yağmuru).
  - Zayıf Noktalar: Runik çizgiler yanarken kanat eklemleri, meteorit yağmuru öncesi açılan sırt plakaları, alev konisi sonrası geçici olarak savunmasız kalan boğaz bölgesi.

## Notlar
- Tüm boss telegraph'ları oyuncuya ses + görsel çiftli ipuçları vermelidir; renk körü desteği için titreşim desenleri eklenmelidir.
- Zayıf noktalar, faz ilerledikçe geçici olarak kapanabilir; bu durum UI'da ikincil bir sağlık katmanı olarak gösterilir.
