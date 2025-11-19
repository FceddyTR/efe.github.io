# Mini 3D Arena demo

Bu repo, VS Code veya terminal üzerinden hızla ayağa kaldırabileceğiniz Three.js tabanlı bir arena prototipini içerir. Karakter WASD ile hareket eder, `1` tuşu ile projectile yollayıp boss'a hasar vererek exp kazanır; exp dolunca seviye atlar ve boss güçlenir.

## Çalıştırma

Önkoşul: Node 18+ (veya yalnızca statik sunucu açabilen bir ortam) önerilir.

```bash
npm install  # bağımlılık olmadığı için atlanabilir
npm start    # http://localhost:4173
```

Alternatif: Python ile statik sunucu

```bash
python3 -m http.server 4173
```

> VS Code içinde Live Server eklentisiyle de doğrudan `index.html` açabilirsiniz.

### Hızlı kontrol

Sunucunun ayağa kalkmadan dosya kökünü doğrulamak için:

```bash
npm run check
```

## Kontroller ve döngü

- **Hareket:** W A S D
- **Kamera:** Fare (OrbitControls)
- **Dash:** Space (bekleme süresi var)
- **Skill:** 1 tuşu (projectile)
- Boss'u vurdukça exp dolar; seviye atlayınca hız artar, boss HP'si yükselir.
