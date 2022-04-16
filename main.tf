terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_ssh_key" "racing-odds-scraper-key" {
  name       = "racing-odds-scraper-key"
  public_key = file(var.do_pub_key)
}

module "container-server" {
  source  = "christippett/container-server/cloudinit"
  version = "1.2.1"

  domain = "rammus.tech"
  email  = var.email

  container = {
    image = "joshuaxong/racing-odds-scraper"
  }
}

resource "digitalocean_droplet" "racing-odds-scraper" {
  name   = "racing-odds-scraper"
  image  = "docker-18-04"
  region = "sgp1"
  size   = "s-1vcpu-1gb"

  ssh_keys = [digitalocean_ssh_key.racing-odds-scraper-key.fingerprint]

  user_data = module.container-server.cloud_config
}
