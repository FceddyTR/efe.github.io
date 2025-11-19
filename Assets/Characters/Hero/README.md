# Hero Asset Specification

## Mesh and Rig
- **Base mesh**: `Assets/Characters/Hero/Hero_BaseMesh.fbx` (FBX) – clean topology, quads only.
- **Skeletal rig**: `Assets/Characters/Hero/Hero_Rig.fbx` (FBX) – game-ready hierarchy with IK/FK switches for arms and legs.
- **Combined mesh+rig export**: `Assets/Characters/Hero/Hero_Rigged.fbx` (FBX) – bound skin with 4-bone max influences per vertex.

## Animation Clips (separate files)
- Idle: `Hero_Anim_Idle.fbx` (FBX) – relaxed breathing loop.
- Run: `Hero_Anim_Run.fbx` (FBX) – forward locomotion, root-motion enabled.
- Attack: `Hero_Anim_Attack.fbx` (FBX) – primary light attack, 1-second duration.
- Hit/Flinch: `Hero_Anim_Hit.fbx` (FBX) – quick recoil, root locked.
- Death: `Hero_Anim_Death.fbx` (FBX) – collapses and holds final pose.
- Ultimate: `Hero_Anim_Ultimate.fbx` (FBX) – dramatic charge-up and release, root-motion enabled.

> All animation exports should share the same rig/skeleton as `Hero_Rig.fbx` to ensure retargeting consistency.

## Materials and Textures
- Target workflow: PBR (metallic/roughness).
- Texture sets: Albedo, Normal, Metallic, Roughness, AO, Emissive (optional for ultimate effect glow).
- Resolution targets:
  - **Base/hero body and armor**: 2K (2048×2048) per material set.
  - **Weapons/props**: 1K (1024×1024) when separate materials are needed.
- File formats: PNG or TGA with lossless compression; 16-bit for normals if possible.

## LOD Targets
- **LOD0**: ~60–80k tris for cinematic-quality close-ups.
- **LOD1**: ~40–50k tris; bake normals from LOD0.
- **LOD2**: ~20–25k tris; simplify accessories, merge small parts.
- **LOD3 (mobile/RTS view)**: ~8–12k tris; baked lighting where possible.

LOD meshes should share UVs/material assignments where feasible for texture reuse.
