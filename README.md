# Better RTX Installer MCLauncher Fork

This is a fork of the official BetterRTX Installer that does not require IObit. This version will only work if you installed the game in a different directory than the protected directory Microsoft forces you to install by default. 

Due to not being in a protected area, we can use normal powershell copy/delete commands to push the files, automating the process of moving the files without needing to use a program (OIbit as an example) to escalate privileges higher than Microsoft wants us to attain.

### Prerequisites

[download](https://github.com/Uzephi/BetterRTX-Installer/releases) the installer script

https://github.com/user-attachments/assets/eb3ce4a4-600c-4999-bee3-3e43abc00479

- Use software like
  [MCLauncher](https://github.com/MCMrARM/mc-w10-version-launcher) or
  [Bedrock Launcher](https://github.com/BedrockLauncher/BedrockLauncher) to
  easily create a side-loaded Minecraft installation.

## Installation
Copy and paste the following line into a command terminal to start the installer. _(English version)_

```
powershell -c "iwr https://bedrock.graphics/installer -useb | iex"
```

---


Right click the `installer.ps1` file and select _Run with PowerShell_ to start the installer script.

---

## Help

![Discord](https://img.shields.io/discord/691547840463241267?style=flat-square&logo=discord&logoColor=%23ffffff&label=Minecraft%20RTX%20Discord)

Join the
[Minecraft RTX Discord](https://discord.com/invite/minecraft-rtx-691547840463241267)
or
[open an Issue on GitHub](https://github.com/BetterRTX/BetterRTX-Installer/issues)
for additional help.

[Read the Wiki](https://github.com/BetterRTX/BetterRTX-Installer/wiki) for more details and instructions.


## Screenshots

![BetterRTX](https://github.com/BetterRTX/BetterRTX-Installer/assets/81783950/ef6a098d-3f54-48cf-ad83-1a709d251fd1)
> ###### Screenshot courtesy @jancaplayer on Discord

---

**[Credits](CREDITS.md) | [Contribute](CONTRIBUTING.md) | [Code of Conduct](CODE_OF_CONDUCT.md) | [Changelogs](CHANGELOGS.md) | [Security Policy](SECURITY.md)**

Licensed under a [GNU GENERAL PUBLIC LICENSE](LICENSE.md)

**_BetterRTX_ is not affiliated with NVIDIA or Mojang.**
