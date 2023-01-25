---
layout: post
title: Setting Up a SteamCMD Dedicated Server
description: For CS:GO or any other supported game
---
{: .large}
Surprisingly, there isn't a guide where you can get all the information you really need for this in one spot, so, together with my [last post](https://anitanotto.com/securing-and-deploying-a-vps/), this will get you everything you need to get a dedicated server running all in one spot.

Since we used Arch in our last example, you're going to need to install this package:

    Make sure these two lines are uncommented in /etc/pacman.conf:
    [multilib]

    Include = /etc/pacman.d/mirrorlist

    Then install this package:

    $ pacman -Sy lib32-gcc-libs

Our server doesn't have any of the necessary ports open, we're going to need to set some firewall rules.

[Valve's guide](https://developer.valvesoftware.com/wiki/SteamCMD) recommends these rules:

    iptables -A INPUT -p udp -m udp --sport 27000:27030 --dport 1025:65355 -j ACCEPT
    iptables -A INPUT -p udp -m udp --sport 4380 --dport 1025:65355 -j ACCEPT

But my server wouldn't show up on the server browser until I set these as well:

    iptables -A INPUT -p tcp --dport 27015 -j ACCEPT
    iptables -A INPUT -p udp --dport 27015 -j ACCEPT
    iptables -A INPUT -p udp --dport 27020 -j ACCEPT
    iptables -A INPUT -p udp --dport 27005 -j ACCEPT
    iptables -A INPUT -p udp --dport 51840 -j ACCEPT

SteamCMD is an AUR package so we'll just clone it down to install it:

    git clone https://aur.archlinux.org/steamcmd.git
    cd steamcmd
    makepkg -si

You could be smart and [make a separate user just to run the server](https://www.vultr.com/docs/setup-counter-strike-global-offensive-server-on-arch-linux/#Install_The_Counter_Strike__Global_Offensive_Server), but, either way, after that in your home directory you can just run this command to get most everything setup (using CSGO for this example but this will work with [any game that is supported by SteamCMD](https://developer.valvesoftware.com/wiki/Dedicated_Servers_List), just change the app ID after the +app_update flag):

    sudo -u username steamcmd +force_install_dir /pathYouWantToInstallAt +login anonymous +app_update 740 validate +quit

To actually run the server, you're going to need a [dedicated server login token](https://steamcommunity.com/dev/managegameservers).

If you want to just run the server with the stock config running this command inside your server directory should do it:

    ./srcds_run -console -game csgo -usercon +sv_setsteamaccount ServerToken +game_type 0 +game_mode 0 +mapgroup mg_active +map de_dust2'

But if you want to customize everything, all the variables are available [here](https://developer.valvesoftware.com/wiki/List_of_CS:GO_Cvars) and you can set basic stuff like the server name and if you want a password in [/serverPath/csgo/cfg/server.cfg](https://www.vultr.com/docs/setup-counter-strike-global-offensive-server-on-arch-linux/#Configuring)

Settings for game mode rules and maps/map groups you can set in /serverPath/csgo/gamemodes_server.txt and need to be formatted like this:

    "GameModes_Server.txt"
    {
        "gameTypes"
        {
            "classic"
            {
                "gameModes"
                {
                    "casual"
                    {
                        "mapgroupsMP"
                        {
                            "mg_custom"    ""
                        }
                    }
                }
            }
        }

        "mapgroups"
        {
            "mg_custom"
            {
                "name"    "mg_custom"
                "maps"
                {
                    "de_dust2" ""
                }
            }
        }
    }

Finally, there's one last file in /serverPath/csgo/ named gamerulescvars.txt.example you can either rename to just gamerulescvars.txt or also go into it and change any settings you like.

Now you can run your customized server with srcds_run and any flags you want to change up the game modes or map groups you set, or [install tmux to run the server in the background or setup your server to run it automatically.](https://www.vultr.com/docs/setup-counter-strike-global-offensive-server-on-arch-linux/#Running_Your_Server)
