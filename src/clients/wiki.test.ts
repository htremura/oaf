import axios from "axios";
import { afterEach, describe, expect, test, vi } from "vitest";

import { respondWithFixture } from "../testUtils.js";
import { Effect } from "../things/Effect.js";
import { Skill } from "../things/Skill.js";
import { wikiClient } from "./wiki.js";

vi.mock("axios");

afterEach(() => {
  vi.mocked(axios).mockReset();
});

describe("Wiki links", () => {
  test("Can get wiki link for an effect under id 100", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(
      await respondWithFixture(__dirname, "effects_by_number.html")
    );

    const effect = Effect.from(
      "23	Pasta Oneness	mandala.gif	583619abc0e4380d80629babe3677aed	good	none	cast 1 Manicotti Meditation"
    );
    const link = await wikiClient.getWikiLink(effect);

    expect(axios.get).toHaveBeenCalledWith(
      "https://kol.coldfront.net/thekolwiki/index.php/Effects_by_number"
    );
    expect(link).toBe("https://kol.coldfront.net/thekolwiki/index.php/Pasta_Oneness");
  });

  test("Can get wiki link for an effect over id 100", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(
      await respondWithFixture(__dirname, "effects_by_number_100.html")
    );

    const effect = Effect.from(
      "127	Gothy	gothy.gif	06cb86ddd689278c5af31423a8210a72	neutral	none	use either 1 spooky eyeliner, 1 spooky lipstick|drink 1 gloomy mushroom wine"
    );
    const link = await wikiClient.getWikiLink(effect);

    expect(axios.get).toHaveBeenCalledWith(
      "https://kol.coldfront.net/thekolwiki/index.php/Effects_by_number_(100-199)"
    );
    expect(link).toBe("https://kol.coldfront.net/thekolwiki/index.php/Gothy");
  });

  test("Can get wiki link for a skill", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(
      await respondWithFixture(__dirname, "skills_by_number.html")
    );

    const skill = Skill.from("4015	Impetuous Sauciness	5alarm.gif	0	0	0	12");
    const link = await wikiClient.getWikiLink(skill);

    expect(axios.get).toHaveBeenCalledWith(
      "https://kol.coldfront.net/thekolwiki/index.php/Skills_by_number"
    );
    expect(link).toBe("https://kol.coldfront.net/thekolwiki/index.php/Impetuous_Sauciness");
  });
});