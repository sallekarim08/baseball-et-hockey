# Plateforme d'analyse statistique — Baseball & Hockey sur glace

Site d'analyse statistique pour le baseball (MLB/MiLB) et le hockey sur glace
(NHL), basé exclusivement sur des sources de données officielles et gratuites.

Voir `specifications-baseball-hockey.docx` (à ajouter au dépôt) pour le
cahier des charges complet.

## Sources de données

- **Baseball** : [statsapi.mlb.com](https://statsapi.mlb.com) — API officielle MLB, publique, sans clé (MLB + MiLB : AAA, AA, High-A, Single-A, Rookie)
- **Hockey sur glace** : [api-web.nhle.com](https://api-web.nhle.com) — API officielle NHL, publique, sans clé

## État d'avancement

- [x] Phase 1 — Fondations : schéma de base de données + importeurs MLB/NHL
- [ ] Phase 2 — Onglet Rencontres
- [ ] Phase 3 — Couche d'adaptation par sport (box-scores détaillés)
- [ ] Phase 4 — Onglet Analyse
- [ ] Phase 5 — Elo maison + Outsider vs Favori
- [ ] Phase 6 — Stratège (moteur de probabilités)
- [ ] Phase 7 — Module de suivi des pronostics

## Structure du projet
