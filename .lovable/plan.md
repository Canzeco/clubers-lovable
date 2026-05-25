## Qué traemos de Mesita a Clubers

De Notion (Main) saco 8 primitivas que hacen real el modelo. Las llevo a Clubers manteniendo su modelo de 5 entidades (Places, Experiences, Events, Communities, People) y 4 modos de discover.

### 1. Participación: Listed vs Verified Partner
Ya existe. Lo dejo igual. Aplica a las 5 entidades.

### 2. Tipo fiscal → mecánica forzada (solo Partners transaccionales)
Cada Place/Experience/Event partner declara fiscal_type:
- **Formal** → cashback como créditos Clubers (válido solo si paga con tarjeta vía Clubers)
- **Informal** → descuento instantáneo aplicado al ticket (Clubers no toca el pago)

Communities y People no aplican (no hay ticket).

### 3. Tres paths a la clase (Bronze/Silver/Gold/Diamond)
La clase activa = la más alta de:
- **Followers IG** verificados: <1K Bronze · 1K Silver · 5K Gold · 20K Diamond. Requiere story tag al venue para liberar el perk.
- **Suscripción** (200/500/1000 MXN): instantánea, sin story.
- **Manual**: invitación para influencers reales (chefs, prensa, fundadores).

Profile muestra los tres paths con su estado y la clase efectiva.

### 4. Welcome perk universal
Primera visita a cualquier partner muestra perk de bienvenida (cashback o descuento). Ya existe en seed; lo formalizo como sección dedicada en el venue detail.

### 5. AI Reservation/Booking en cualquier entidad
Funciona en Places listed y partner — para Experiences/Events se convierte en "AI Booking" (DM IG, web form, email). Ya existe el flujo; le añado los canales que ve el guest.

### 6. Story-tag verification (path followers)
En el flujo de Pay, si el guest llegó por path followers, el QR no libera el perk hasta verificar story con @mention. Auto-aprueba con mock; manual fallback "en revisión".

### 7. Comunidades + gamificación + sharing
- Communities ya implementadas — añadir badge "verifica tu correo @x.mx".
- Gamificación: XP, nivel con nombre (Tastemaker/Connoisseur/Icon), streak de visitas, badge regional. Se muestra en Profile.
- Share: ya existe. Le añado "Regala suscripción Silver/Gold" (gift cards) y código de creador con tracking de visitas.

### 8. Renombrar QR → Pay + Wallet
La pestaña central pasa de QR a Pay con dos sub-tabs:
- **QR**: el código para escanear en venue
- **Wallet**: créditos Clubers acumulados (de cashback), historial de transacciones, gift cards recibidos

## Cambios concretos por archivo

### `src/lib/clubers/data.ts`
- Listing: añadir `fiscalType?: "formal" | "informal"` a partners transaccionales
- Tipo `ClassPaths` por usuario: `{ followers: { handle, count, tier }, subscription: { tier, since } | null, manual: { tier, reason } | null }`
- Tipo `WalletState`: `{ credits, transactions[], giftCards[] }`
- Tipo `Gamification`: `{ xp, level, streak, badges[] }`
- Seed: añadir fiscalType a los venues partner, mock de wallet/gamification del usuario actual

### `src/components/emulators/GuestApp.tsx`
- BottomNav: cambiar `qr` por `pay` (label "Pay") manteniendo icono
- `PayScreen`: dos sub-tabs (QR · Wallet). Wallet muestra créditos, lista de tx y gift cards. QR mantiene UI actual.
- `Profile`: bloque "Tu clase" muestra los 3 paths con estado y cuál está activo. Botón Upgrade ofrece subir el path de suscripción.
- `Profile`: añadir bloque Gamificación (XP/nivel/streak/badges)
- `VenueDetail`: si fiscalType=informal, etiquetar perk como "descuento instantáneo"; si formal, "cashback en créditos". Welcome perk en bloque destacado.
- `ShareScreen`: añadir CTA "Regalar suscripción"

### Strings en `t.*`
Añadir keys nuevas para pay, wallet, paths, gamification, welcome.

## Lo que NO entra en este pase
- Manager app (sigue como ya está)
- Suscripción real con Stripe — solo mock UI
- IG OAuth real — el handle y followers se simulan
- Story-tag scanner real — sólo el estado en UI

## Riesgo / scope
Es 1 archivo de datos + 1 archivo de UI (~250 líneas netas añadidas). Ningún cambio de routing, ninguna migración Supabase, ninguna dependencia nueva.

¿Avanzo con esto, o quitas/agregas algo antes?
