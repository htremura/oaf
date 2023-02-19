import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import { wikiClient } from "../../kol";

export const data = new SlashCommandBuilder()
  .setName("rescan")
  .setDescription("Reload OAF's in-game information from mafia's datafiles.");

export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply();

  if (await wikiClient.conditionallyReloadMafiaData()) {
    return interaction.editReply("Information reloaded from KoLMafia Github data files.");
  }

  return interaction.editReply("Information reloaded too recently, try again later.");
}