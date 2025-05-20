---
layout: casestudy
title: "Avventura VDI – Da lavoratore remoto ad amministratore"
date: 2021-12-10
image: /assets/img/vdi_adventure.avif
summary: "Talk m0leCon 2021 su come abbiamo esfiltrato dati ed evaso le sandbox Citrix."
description: "Talk m0leCon 2021 su come abbiamo esfiltrato dati ed evaso le sandbox Citrix."
lang: it
permalink: /it/casestudies/vdi/
alt_url: /casestudies/vdi/
resources:
  - label: Slide
    type: pdf
    url: /assets/docs/A_VDI_adventure.pdf
---

## Contesto
Durante un red team di cinque giorni per **“MegaCorp”** abbiamo valutato un VDI Citrix per lo smart working. Obiettivo: esfiltrare dati dalla rete interna nonostante le rigide policy.

## Percorso di attacco principale

| Fase | Evidenza |
|------|---------|
| **Accesso** | Funzionalità clipboard e transfer limitate; copy/paste disabilitato → abusato IBM Cloud e ZeroBin per bypassare i proxy. |
| **Esfiltrazione** | Script _DNS-over-AES_ per inviare payload via record TXT. |
| **Evasione sandbox** | Uso di macro **Office VBA** e **FTP interactive console** per lanciare comandi; abuso di **rundll32** per eseguire tool custom quando `cmd.exe` era bloccato. |
| **Privilege escalation** | Dump di `Groups.xml` / `Drives.xml`, crack di `cpassword`, riutilizzo dell’Admin locale su cinque host, incluso un DC. |

## Impatto

* Full domain-admin in **≤ 1 giorno**.
* Dimostrati percorsi di esfiltrazione che bypassavano DLP e ispezione SSL.
