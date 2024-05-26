# Better RTX Installer MCLauncher Fork

This is a fork of the official BetterRTX Installer that does not require IObit. This version will only work if you installed the game in a different directory than the protected directory Microsoft forces you to install by default. 

Due to not being in a protected area, we can use normal poweershell copy/delete commands to push the files, automating the process of moving the files without needing to use a program (OIbit as an example) to escalate priviledges higher than Microsoft wants us to attain.

## Installation

> [download](https://github.com/Uzephi/BetterRTX-Installer/releases) the installer script
### Prerequisites

- Use software like
  [MCLauncher](https://github.com/MCMrARM/mc-w10-version-launcher) or
  [Bedrock Launcher](https://github.com/BedrockLauncher/BedrockLauncher) to
  easily create a side-loaded Minecraft installation.

## Usage

Entering the [installation command](#installation) will invoke the [installer script](v2/installer.ps1), backup the Minecraft files to mod, then open a __BetterRTX Installer__ window.

### Quick Start
1. Select the Minecraft installation instance(s) to modify.
2. Select a preset from the list.
3. Click __Install__ to download and copy the mod files into the selected instances.
4. [Enjoy](#screenshots) 😎

---

#### Setup Menu

##### Backup

Though an initial backup is performed upon first starting the installer, you may also use the _Backup_ option to export the current preset as a `.mcpack` file. These settings can later be restored by installing the backup file as a custom preset.

##### Uninistall

Selecting the _Uninstall_ option will revert the BetterRTX Installer's changes and remove its cached files.

## Help

![Discord](https://img.shields.io/discord/691547840463241267?style=flat-square&logo=discord&logoColor=%23ffffff&label=Minecraft%20RTX%20Discord)

Join the
[Minecraft RTX Discord](https://discord.com/invite/minecraft-rtx-691547840463241267)
or
[open an Issue on GitHub](https://github.com/BetterRTX/BetterRTX-Installer/issues)
for additional help.

[Read the Wiki](https://github.com/BetterRTX/BetterRTX-Installer/wiki) for more details and instructions.

---

##### See [CREDITS.md](CREDITS.md) for the Credits for this Project

##### See [CONTRIBUTING.MD](CONTRIBUTING.md) for accepted Contributions

##### See [LICENSE.md](LICENSE.md) for a GitHub Markdown file listing the License.

##### See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the Code of Conduct

##### Read the Changelogs in [CHANGELOGS.md](CHANGELOGS.md)

##### Read our Security Policy in [SECURITY.md](SECURITY.md)

---

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nc-nd/4.0/).
![http://creativecommons.org/licenses/by-nc-nd/4.0/](https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png)

---

##### Screenshots

![BetterRTX](https://github.com/BetterRTX/BetterRTX-Installer/assets/81783950/ef6a098d-3f54-48cf-ad83-1a709d251fd1)
> ###### Screenshot courtesy @jancaplayer on Discord

---

**_BetterRTX_ is not affiliated with NVIDIA or Mojang.**
