# Skill VFX/SFX Requirements

## Fireball
- **VFX assets**: `Assets/VFX/Skills/Fireball/Fireball_FX.fbx` (mesh projectile), `Fireball_Impact.glb` (impact burst), `Fireball_Trail.glb` (ribbon/particle mesh).
- **Textures**: 1K flipbook for flame, 1K noise mask, emissive ramp (256px gradient).
- **SFX cues**: `Fireball_Cast.wav` (whoosh/charge), `Fireball_Travel.wav`, `Fireball_Impact.wav` (explosive hit).
- **Timing notes**: 0.3s cast charge, 0.8s travel, impact burst 0.6s with lingering embers.

## Dash
- **VFX assets**: `Assets/VFX/Skills/Dash/Dash_Trail.glb` (streak mesh), `Dash_Start.glb` (burst), `Dash_End.glb` (fade-out sparks).
- **Textures**: 512px directional blur strip, 512px noise for alpha erosion.
- **SFX cues**: `Dash_Start.wav`, `Dash_Whoosh.wav`, `Dash_End.wav`.
- **Timing notes**: Start burst 0.1s, trail persists during movement (0.4–0.8s), end sparkles 0.3s.

## AOE (Ultimate)
- **VFX assets**: `Assets/VFX/Skills/AOE/AOE_Windup.glb` (ground rune), `AOE_Impact.glb` (shockwave + debris meshes), `AOE_Linger.glb` (smoke/embers loop).
- **Textures**: 2K rune decal, 1K smoke flipbook, 1K debris mask, emissive pulse gradient (512px).
- **SFX cues**: `AOE_Windup.wav` (charging hum), `AOE_Impact.wav` (heavy slam), `AOE_Linger.wav` (smoldering loop).
- **Timing notes**: Windup 1.2s synced to ultimate animation; impact burst ≤0.4s; lingering loop 2–3s.

> Place skill-specific folders under `Assets/VFX/Skills/` and keep audio (WAV, 44.1 kHz) alongside VFX sources for easier handoff.
