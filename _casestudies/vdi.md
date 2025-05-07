---
title:  "A VDI Adventure – From Home-Worker to Server Admin"
date:   2021-12-10
image:  /assets/img/vdi_adventure.png   # replace with slide cover
summary: "m0leCon 2021 talk showing how we exfiltrated data and escaped Citrix sandboxes."
---

## Context  
During a five-day red-team for **“MegaCorp”**, we assessed a Citrix VDI used for smart-working. Goal: exfiltrate data from the internal network despite heavy lockdown policies.

## Key Attack Path  

| Phase | Highlight |
|-------|-----------|
| **Foothold** | Limited clipboard + transfer features; copy/paste disabled → abused IBM Cloud & ZeroBin to bypass proxy categories. |
| **Exfiltration** | Built _DNS-over-AES_ script to stream payloads via TXT records. |
| **Sandbox Escape** | Leveraged **Office VBA** macros and **FTP interactive console** to spawn commands; abused **rundll32 to run custom-code command line tool** when `cmd.exe` was blocked. |
| **Privilege Escalation** | Dumped `Groups.xml` / `Drives.xml`, cracked `cpassword`, reused local Admin on five hosts, including a DC. |

## Impact  

* Full domain-admin in **≤ 1 day**.  
* Demonstrated data exfiltration routes that bypassed DLP / SSL inspection.  
* Customer implemented PAC-file hardening, device isolation, and GPO whitelisting.  

[Slide deck (PDF)](/assets/docs/A_VDI_adventure.pdf)
