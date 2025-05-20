---
title:  "Jackpotting Simulation – ATM Red Team for major Financial Institution"
date:   2024-07-16
image:  /assets/img/atm_redteam.avif      # replace with lab photo
description: "Red team activity for finance corp involving the attack of ATM systems with latest techniques"
summary: "End-to-end test proved €0-to-cash-out in < 5 min using a €50 toolset and Raspberry Pi HID implant."
---

## Objective  
Replicate modern **black-box / hybrid jackpotting** tactics on NCR & Diebold ATMs in customer’s lab.  

## Toolset & Method  

* €50 hardware kit: **Raspberry Pi Zero W**, USB hub, crocodile clips, cordless drill.  
* HID attack: cut keypad USB, insert Pi → emulates keyboard _and_ NIC.  
* PowerShell loader pulls XFS custom utilities + custom payload, commands cash dispenser.  
* DNS covert channel validated exfil in "air-gapped" mode.

## Outcome  

| Metric | Result |
|--------|--------|
| Cash-out | **Success** – full dispenser control |
| Detection | No AV / EDR alerts |
| Time on device | **< 5 min** per ATM |
| Findings | 5 critical (USB HID, admin account, DNS tunneling, app whitelisting, DoS bug) |


**Recommendations**  
USB-HID whitelisting, AppLocker/WDAC, non-privileged service accounts, DNS egress filtering.  

*(Detailed report available to client)*  
