terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = "${var.do_token}"
}

resource "digitalocean_ssh_key" "nginx-pub" {
  name       = "nginx-pub-key"
  public_key = file("${var.do_pub_key}")
}

resource "digitalocean_vpc" "nginx-main" {
  name     = "nginx-vpc-main"
  region   = "sgp1"
  ip_range = "172.31.254.0/24"
}

resource "digitalocean_droplet" "nginx-main" {
  name   = "nginx-droplet-main"
  image  = "docker-18-04"
  vpc_uuid = "${digitalocean_vpc.nginx-main.id}"
  region = "sgp1"
  size   = "s-1vcpu-1gb"

  ssh_keys = ["${digitalocean_ssh_key.nginx-pub.fingerprint}"]

  provisioner "remote-exec" {
    connection {
      type = "ssh"
      user = "root"
      host = "${self.ipv4_address}"
      private_key = file("${var.do_priv_key}")
    }

    inline = [
      "apt-get update",
      "ufw allow http",
      "ufw allow https",
      "ufw allow 1337",
      "apt -y install nginx",

      "git clone https://github.com/JoshuaXOng/racing-odds-scraper.git",
      "cd ./racing-odds-scraper/ops/nginx/",
      "mv ./jxo-gateway.conf /etc/nginx/conf.d/",
      "rm /etc/nginx/sites-enabled/default",
      "rm /etc/nginx/sites-available/default",
    ]
  }
}

resource "digitalocean_firewall" "nginx-main" {
  name = "nginx-fw-in-22-80-443-and-1337-out-dns"

  droplet_ids = [digitalocean_droplet.nginx-main.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = var.whitelisted_ssh_ips
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "1337"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "icmp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "53"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "53"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

# resource "digitalocean_certificate" "nginx-main" {
#   name    = "nginx-cert-main"
#   type    = "lets_encrypt"
#   domains = [var.nginx-hostname]

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# resource "digitalocean_domain" "nginx-main" {
#   name       = var.nginx-hostname
# }

# resource "digitalocean_record" "nginx-a" {
#   domain = digitalocean_domain.nginx-main.id
#   type   = "A"
#   name   = "@"
#   value  = digitalocean_loadbalancer.nginx-public.ip
# }
