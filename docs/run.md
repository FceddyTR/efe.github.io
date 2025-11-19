# Çalıştırma ve Build Rehberi

Bu proje Unity tabanlıdır. Aşağıdaki SDK ve araç sürümleri ile kurulumu yapın, gerekli bağımlılıkları kurduktan sonra hedef platforma uygun şekilde çalıştırın veya build alın.

## Ön Koşullar

- **Unity Editor:** 2022.3 LTS (ör. 2022.3.22f1). Daha yeni bir LTS kullanıyorsanız proje ayarlarını doğrulayın.
- **Unity Hub:** Projeyi açmak ve modül yönetimi için gerekli.
- **Platform modülleri:**
  - **PC (Windows/macOS/Linux):** Standalone build desteği (varsayılan).
  - **WebGL:** Unity Hub üzerinden *WebGL Build Support* modülünü ekleyin.
  - **Mobile:** İstediğiniz hedefe göre *Android Build Support* (SDK & NDK & OpenJDK) veya *iOS Build Support*.
- **Git:** Kaynak kodu klonlamak için.

## Projeyi Açma

### Unity Hub ile
1. Depoyu klonlayın: `git clone https://.../efe.github.io.git`.
2. Unity Hub > **Add** > proje klasörünü (`efe.github.io/`) seçin.
3. Proje açıldığında **Scenes** içerisindeki ana sahneyi yükleyin veya *Build Settings* menüsünden platform hedefini doğrulayın.

### Komut Satırı (Make)
- Unity Editor yolu çevresel değişkenine göre değişir. Gerekirse `UNITY_PATH` değişkenini geçerek kullanın (örn. `make start UNITY_PATH="/Applications/Unity/Hub/Editor/2022.3.22f1/Unity.app/Contents/MacOS/Unity"`).
- Projeyi açmak için (GUI başlatır):
  ```bash
  make start
  ```

## Build / Çalıştırma Komutları

`Makefile` içerisinde hedef platformlar için hazır komutlar tanımlıdır:

- **Windows/macOS/Linux (standalone):**
  ```bash
  make build-desktop
  ```
- **WebGL:**
  ```bash
  make build-webgl
  ```
- **Android:**
  ```bash
  make build-android
  ```

Her komut Unity'nin batchmode'unda derleme yapar; çıktılar `Build/` dizini altına yazılır. Gerekirse `BUILD_OUTPUT` veya `PROJECT_PATH` değişkenlerini override edebilirsiniz.

## Lokal Test Akışları

### PC (Windows/macOS/Linux)
1. `make build-desktop` ile build alın.
2. Oluşan `Build/Standalone/Player` klasöründeki çalıştırılabilir dosyayı açın.

### WebGL
1. `make build-webgl` çalıştırın.
2. `Build/WebGL` çıktısını yerel bir HTTP sunucusunda servis edin (örn. `npx http-server Build/WebGL -p 8080`).
3. Tarayıcıdan `http://localhost:8080` adresine giderek testi yapın.

### Mobile (Android/iOS)
- **Android:** `make build-android` komutu `.apk` veya `.aab` üretir. Çıktıyı cihazınıza veya emülatöre yükleyin (`adb install`).
- **iOS:** iOS desteği için Mac üzerinde iOS modülünü ekleyip Xcode projesini oluşturun, ardından Xcode ile derleyin ve cihaz/simülatörde test edin.

## Unreal Alternatifi

Proje Unreal Engine'e taşınacaksa önerilen sürüm **Unreal Engine 5.3**. Unreal kullanımı için `*.uproject` dosyasını Unreal Editor ile açıp hedef platforma uygun *Platforms* menüsünden build alabilirsiniz.
