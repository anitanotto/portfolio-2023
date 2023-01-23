---
layout: post
title: Securing and Deploying a VPS
description: How to setup whatever you want on a cloud server.
---
{: .large}
I've wanted to run some things on my own server, but, I don't have any spare hardware at the moment. Luckily it's easy and cheap to get a VPS up and running so you don't have to worry about any of that.

Today I'm going to be using Vultr and Arch Linux, but, use whatever cloud provider or OS you like. The commands I give here will mostly be linux-distro-agnostic so just swap out the few that are not and this should work for you, too. 

## Vultr Setup

Any cloud provider is going to make it easy to get your VM up and running, just pick whatever options fit your use case and/or budget and deploy your server.

Vultr specifically provides an option to pre-load SSH keys onto your new server on the [settings page](https://my.vultr.com/settings/#settingssshkeys), but, this option didn't seem to want to work for me.

Either way, we're going to generate a new key, and they recommend using this command:

     $ ssh-keygen -t ed25519 -C "your_email@example.com"

It'll ask you what you want to name your new key file, we'll just use 'testserver' as an example.

Once your server is deployed, you can either SSH in with the credentials on the server details page for it, or open the console through the website.

## Server Setup

Since [anyone can be owned](https://maia.crimew.gay/posts/how-to-hack-an-airline/), we're going to take some extra steps to secure our new server.

Everything is probably already good to go, but, just in case we will ensure all of our packages are up to date:

    $ pacman -Syu

Next we're going to create a non-root user 1) so we're a bit more secure by not running everything as root & 2) so we can run anything you're not supposed to run as root like make:

    $ useradd -mg wheel username
    $ passwd username

Vultr sets things up to allow wheel group members to run any command without a password, so, we're going to fix that:

    $ vim /etc/sudoers

    At this line:
    ## Same thing without a password
    %wheelnpw ALL=(ALL:ALL) ALL         <~ Add a # at the start to comment this out.

This is a read only file, so, you're going to need to :wq! to exit even though you're root.

Now we can go to our new user's home directory and setup everything we need for SSH:

    $ cd /home/username
    $ mkdir .ssh
    $ chmod 700 .ssh
    $ cd .ssh

    $ touch authorized_keys
    Paste the public key you generated earlier into this file.

    $ chmod 600 authorized_keys
    $ chown -R username /home/username/.ssh

This gets our key onto the VPS and sets the permissions for all the files properly so we can SSH in later.

To seal everything up tight we're now going to disable password authentication and the root login via SSH so you need a key to get in:

    $ vim /etc/ssh/sshd_config
    
    Uncomment this line:
    PubkeyAuthentication: yes

    Change the last two lines from yes to no:
    PermitRootLogin no
    PasswordAuthentication no

Then just restart the SSH daemon and you're good to go:

    $ systemctl restart sshd

Finally, create a file named 'config' on your home machine's .ssh folder formatted like so:

    Host testserver
        HostName Your.Vultr.IP.Address
        Port 22
        User username
        PreferredAuthentication publickey
        IdentityFile ~/.ssh/testserver

With that, [there are a few extra steps](https://youtu.be/Nuv1mPuHFvg?t=348) you could take for some extra security like setting up your firewall properly, but, that will depend on what you want to do with your server. So, now we're ready to back out of the console and SSH in to setup whatever you want!
