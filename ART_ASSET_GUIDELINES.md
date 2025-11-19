# Görsel Varlık Performans Kılavuzu

Bu belge, proje genelinde 3D içeriklerin hedef platformlara uygun performansta üretilmesi için bütçeleri ve kısıtları özetler.

## 1) Poly/Tri ve Draw Call Bütçeleri

| Varlık / Platform | Mobil (low/mid) | PC/Console |
| --- | --- | --- |
| Oynanabilir karakter | **\< 50k tris** (tek materyal, 2-3 set-pass) | **\< 80k tris** (tek materyal, 2-3 set-pass) |
| Boss / büyük düşman | **\< 120k tris** (tek materyal, 3-4 set-pass) | **\< 200k tris** (tek materyal, 4-5 set-pass) |
| Küçük props | **5-8k tris** | **8-15k tris** |
| Orta props | **8-15k tris** | **15-30k tris** |
| Tek ekran karede toplam tri | **\< 1.2M tris** | **\< 2.5M tris** |
| Draw call bütçesi (ortalama) | **\< 120** | **\< 250** |
| Draw call bütçesi (pik sahne) | **\< 150** | **\< 320** |

Ek notlar:
- Skinned mesh sayısını düşük tutun; her karakteri tek parça mesh + materyal halinde çıkarmaya öncelik verin.
- Batching için ortak materyal/atlas paylaşımını zorunlu tutun; farklı shader varyantlarını minimumda tutun.
- Alpha blended meshler draw call ve overdraw maliyeti yaratır; gerektiğinde opağe çevirin veya maske kullanın.

## 2) Shader ve Işıklandırma Kısıtları

### Mobil
- **Shader:** Basit PBR (metallic/roughness) veya lit/unlit tek varyant; real-time refraction/planar reflection yok. Parallax, tessellation, screen-space efektler devre dışı.
- **Işık:** 1 ana yönlü ışık (shadow cascades 2-3); lokal ışıklar shadowless veya baked. Lightmap çözünürlüğü 20-30 texels/m aralığında.
- **Post:** Bloom ve tonemapping harici screen-space efektleri kapalı (SSR, SSAO, SSGI yok). Motion blur yalnızca sinematikte.

### PC/Console
- **Shader:** Standart PBR; parallax occlusion ve clear coat yalnızca hero materyallerde. Tessellation yok; screen-space efektler (SSR/SSAO) sınırlı preset ile.
- **Işık:** 1 ana yönlü + 2-3 dinamik bölgesel ışık gölgeli; ek ışıklar gölgesiz. Lightmap çözünürlüğü 30-50 texels/m, light probe yoğunluğu 3-5 m.
- **Post:** Bloom, tonemapping, hafif SSAO/SSR; SSGI devre dışı.

### LODGroup ve Occlusion Planı
- **LOD sayısı:** Kahraman ve boss için min. 3 LOD; küçük props için 2. LOD sınırları mobilde 8m/16m/30m, PC'de 15m/30m/60m.
- **Cross-fade:** LOD transition için cross-fade veya dithering kullanın; mobilde shader varyantlarını artırmayacak şekilde.
- **Occlusion Culling:** Tüm büyük yapılar ve kapalı alan modüllerinde occlusion area + portal kurun. Kamera yakınındaki büyük props'lar için `Occlusion Static` işaretleyin.
- **Shadow Cascades:** Mobil 2-3, PC 3-4; uzak nesneleri shadow caster listesinden çıkarmayı unutmayın.

## 3) VFX Kısıtları
- **Particle Count:** Tek efekt için mobilde anlık < **300**, ortalama < **120**; PC'de anlık < **600**, ortalama < **250**. Ekran genelinde mobil < **800**, PC < **1500**.
- **Overdraw:** Alpha blended partiküllerde UV alanını sıkıştırın, "soft particle" yarıçapını 0.5x-0.75x'ye düşürün.
- **Texture Atlas:** Aynı VFX teması için 2-4 sprite'ı tek atlas (max 512² mobil, 1024² PC) içinde toplayın; padding ≥ 8px. Atlas'ı tek materyal ve instanced draw ile kullanın.
- **Material:** Mobilde additive veya unlit alpha; PC'de gerektiğinde lit additive ama normal map yok. Distortion ve refraction mobilde kapalı; PC'de yalnızca boss/ultimate için 1-2 draw call ekstra.
- **Simulation:** GPU particles sadece PC presetinde; mobilde CPU particles + düşük collision step. Trail renderer sayısını 4 ile sınırla.
- **LOD:** VFX için LOD kullanın; uzak VFX'lerde particle sayısını %50-%70 azaltıp sprite boyutunu 1.2x-1.5x büyütün.

## Uygulama ve Kontrol Listesi
- Profiling sırasında kare başına tri ve draw call limitlerini FPS hedefi ile birlikte raporlayın.
- Build pipeline'ında mesh import ayarlarında otomatik `Mesh Compression` (Medium/High) ve `Read/Write` kapalı geldiğinden emin olun.
- Shader keyword sayısını kontrol ederek global keyword sayısını 32 altında tutun; kullanılmayan keyword'leri build öncesi sıfırlayın.
- LODGroup ve Occlusion ayarlarını prefab aşamasında doldurun; seviye editöründe ekstra işlem kalmasın.
