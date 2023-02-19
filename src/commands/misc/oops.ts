import { SlashCommandBuilder } from "@discordjs/builders";

import { execute as purge } from "./purge";

export const data = new SlashCommandBuilder()
  .setName("oops")
  .setDescription("Purges OAF's last message in this channel.");

export const execute = purge;