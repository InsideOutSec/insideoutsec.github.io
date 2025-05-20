---
layout: casestudy
title: "Simulazione Jackpotting – Red Team sugli ATM per grande banca"
date: 2024-07-16
image: /assets/img/atm_redteam.avif
description: "Attività di red team su ATM per istituto finanziario, sfruttando le tecniche di jackpotting più recenti"
summary: "Test completo con prelievo di contante in < 5 min utilizzando hardware da 50 € e Raspberry Pi HID."
lang: it
permalink: /it/casestudies/atm/
alt_url: /casestudies/atm/
---

## Obiettivo
Replicare tattiche moderne di **jackpotting black-box / ibrido** su ATM NCR e Diebold nel laboratorio del cliente.

## Strumentazione e metodo
* Kit hardware da 50 €: **Raspberry Pi Zero W**, hub USB, coccodrilli, trapano.
* Attacco HID: taglio del cavo tastiera USB, inserimento del Pi → emula tastiera e NIC.
* Loader PowerShell scarica utilità XFS e payload personalizzato, comanda il dispenser.
* Canale DNS covert validato per l'esfiltrazione in modalità "air-gapped".

## Risultato

| Metrica | Esito |
|--------|-------|
| Prelievo | **Riuscito** – pieno controllo del dispenser |
| Rilevamento | Nessun allarme AV/EDR |
| Tempo sul dispositivo | **< 5 min** per ATM |
| Vulnerabilità | 5 critiche (USB HID, account admin, tunneling DNS, whitelisting app, bug DoS) |

**Raccomandazioni**
Whitelist USB-HID, AppLocker/WDAC, account di servizio non privilegiati, filtraggio DNS in uscita.

*(Report dettagliato disponibile per il cliente)*
