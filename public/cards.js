// Please note: if you make mercenary warcaster with partisan team, you need to make separate cards for both.
const cards = [
  // Cygnar
    // warcasters:
  {name: 'Stryker1', type: 'warcaster', bgPoints: 30, pointCost: 0, factions: ['cygnar']},
  {name: 'Caine2', type: 'warcaster', bgPoints: 27, pointCost: 0, factions: ['cygnar']},
  {name: 'Maddox1', type: 'warcaster', bgPoints: 30, pointCost: 0, factions: ['cygnar']},
    // warjacks:
  {name: 'Defender', type: 'warjack', bgPoints: 0, pointCost: 16, factions: ['cygnar']},
  {name: 'Avenger', type: 'warjack', bgPoints: 0, pointCost: 17, factions: ['cygnar']},
  {name: 'Charger', type: 'warjack', bgPoints: 0, pointCost: 9, factions: ['cygnar']},
  {name: 'Firefly', type: 'warjack', bgPoints: 0, pointCost: 8, factions: ['cygnar']},
  {name: 'Lancer', type: 'warjack', bgPoints: 0, pointCost: 10, factions: ['cygnar']},
  {name: 'Cyclone', type: 'warjack', bgPoints: 0, pointCost: 13, factions: ['cygnar']},
  {name: 'Hammersmith', type: 'warjack', bgPoints: 0, pointCost: 12, factions: ['cygnar']},
  {name: 'Centurion', type: 'warjack', bgPoints: 0, pointCost: 17, factions: ['cygnar']},
  {name: 'Ironclad', type: 'warjack', bgPoints: 0, pointCost: 12, factions: ['cygnar']},
    // units:,
  {name: 'Rangers', type: 'unit', bgPoints: 0, pointCost: 9, factions: ['cygnar']},
  {name: '6x_Long_gunners', type: 'unit', bgPoints: 0, pointCost: 10, factions: ['cygnar']},
  {name: '6x_Stormguard', type: 'unit', bgPoints: 0, pointCost: 9, factions: ['cygnar']},
  {name: '10x_Stormguard', type: 'unit', bgPoints: 0, pointCost: 15, factions: ['cygnar']},
    // solos:,
  {name: 'Jr_warcaster', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['cygnar']},
  {name: 'Black_13', type: 'solo', bgPoints: 0, pointCost: 10, factions: ['cygnar']},
  
  // Trollbloods
    // warlocks
  {name: 'Ironbra', type: 'warlock', bgPoints: 27, pointCost: 0, factions: ['trollbloods']},
  {name: 'Madrak1', type: 'warlock', bgPoints: 29, pointCost: 0, factions: ['trollbloods']},
    // warbeasts:
  {name: 'Dire_Troll_Bomber', type: 'warbeast', bgPoints: 0, pointCost: 19, factions: ['trollbloods']},
  {name: 'Dire_Troll_Mauler', type: 'warbeast', bgPoints: 0, pointCost: 15, factions: ['trollbloods']},
  {name: 'Dire_Troll_Blitzer', type: 'warbeast', bgPoints: 0, pointCost: 16, factions: ['trollbloods']},
  {name: 'Troll_axer', type: 'warbeast', bgPoints: 0, pointCost: 10, factions: ['trollbloods']},
  {name: 'Troll_impaler', type: 'warbeast', bgPoints: 0, pointCost: 11, factions: ['trollbloods']},
  
    // units:
  {name: '6x_Fennblades', type: 'unit', bgPoints: 0, pointCost: 9, factions: ['trollbloods']},
  {name: '10x_Fennblades', type: 'unit', bgPoints: 0, pointCost: 15, factions: ['trollbloods']},
  {name: 'Thumper_crew', type: 'unit', bgPoints: 0, pointCost: 5, factions: ['trollbloods']},
  
    // solos:  
  {name: 'Janissa', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['trollbloods']},
  
  // Circle
    // warlocks
  {name: 'Adri', type: 'warlock', bgPoints: 32, pointCost: 0, factions: ['circle']},
  {name: 'Mohsar', type: 'warlock', bgPoints: 27, pointCost: 0, factions: ['circle']},
    // warbeasts:
  {name: 'Feral_Warpwolf', type: 'warbeast', bgPoints: 0, pointCost: 16, factions: ['circle']},
  {name: 'Pureblood_Warpwolf', type: 'warbeast', bgPoints: 0, pointCost: 17, factions: ['circle']},
  {name: 'Gnarlhorn_Satyr', type: 'warbeast', bgPoints: 0, pointCost: 12, factions: ['circle']},
  {name: 'Gorax_rager', type: 'warbeast', bgPoints: 0, pointCost: 7, factions: ['circle']},
  {name: 'Wild_Argus', type: 'warbeast', bgPoints: 0, pointCost: 7, factions: ['circle']},
  {name: 'Winter_Argus', type: 'warbeast', bgPoints: 0, pointCost: 8, factions: ['circle']},
    // units:
  {name: 'Druids', type: 'unit', bgPoints: 0, pointCost: 10, factions: ['circle']},
  {name: '3x_Skinwalkers', type: 'unit', bgPoints: 0, pointCost: 9, factions: ['circle']},
  {name: '5x_Skinwalkers', type: 'unit', bgPoints: 0, pointCost: 15, factions: ['circle']},
  {name: '5x_Skinwalkers+commander', type: 'unit', bgPoints: 0, pointCost: 19, factions: ['circle']},
  {name: 'Shifting Stones', type: 'unit', bgPoints: 0, pointCost: 3, factions: ['circle']},
    // solos:  
  {name: 'Lord_of_the_Feast', type: 'solo', bgPoints: 0, pointCost: 6, factions: ['circle']},
  {name: 'Druid_wilder', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['circle']},
  
  // Khador
    // warcasters:
  {name: 'Adri_invierno', type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['khador']},
  {name: 'Butcher', type: 'warcaster', bgPoints: 28, pointCost: 0, factions: ['khador']},
    // warjacks:
  {name: 'Juggernaut', type: 'warjack', bgPoints: 0, pointCost: 13, factions: ['khador']},
  {name: 'Destroyer', type: 'warjack', bgPoints: 0, pointCost: 14, factions: ['khador']},
    // units:
  {name: '3x_MOW_Shocktroops', type: 'unit', bgPoints: 0, pointCost: 10, factions: ['khador']},
  {name: '5x_MOW_Shocktroops', type: 'unit', bgPoints: 0, pointCost: 16, factions: ['khador']},
    // solos:
  
  // Retribution
    // warcasters:
  {name: "Kaelyssa", type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['retribution']},
    // warjacks:
  {name: 'Chimera', type: 'warjack', bgPoints: 0, pointCost: 8, factions: ['retribution']},
  {name: 'Manticore', type: 'warjack', bgPoints: 0, pointCost: 14, factions: ['retribution']},
  {name: 'Banshee', type: 'warjack', bgPoints: 0, pointCost: 18, factions: ['retribution']},
    // units:
  {name: '6x_MH_StrikeForce', type: 'unit', bgPoints: 0, pointCost: 10, factions: ['retribution']},
  {name: '10x_MH_StrikeForce', type: 'unit', bgPoints: 0, pointCost: 16, factions: ['retribution']},
  {name: 'Stormfall_archers', type: 'unit', bgPoints: 0, pointCost: 9, factions: ['retribution']},
    // solos:  
  {name: 'Magehunter_assassin', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['retribution']},
  {name: 'Arcanist_Mechanic', type: 'solo', bgPoints: 0, pointCost: 2, factions: ['retribution']},
  
    // Cryx
    // warcasters:
  {name: 'Deneghra1', type: 'warcaster', bgPoints: 26, pointCost: 0, factions: ['cryx']},
  {name: 'Goreshade2', type: 'warcaster', bgPoints: 28, pointCost: 0, factions: ['cryx']},
  {name: 'Witch_Coven', type: 'warcaster', bgPoints: 26, pointCost: 0, factions: ['cryx']},
  {name: 'Agathia1', type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['cryx']},
    // warjacks:
  {name: 'Slayer', type: 'warjack', bgPoints: 0, pointCost: 10, factions: ['cryx']},
  {name: 'Reaper', type: 'warjack', bgPoints: 0, pointCost: 13, factions: ['cryx']},
  {name: 'Deathripper', type: 'warjack', bgPoints: 0, pointCost: 6, factions: ['cryx']},
  {name: 'Defiler', type: 'warjack', bgPoints: 0, pointCost: 8, factions: ['cryx']},
  {name: 'Desecrator', type: 'warjack', bgPoints: 0, pointCost: 14, factions: ['cryx']},
  {name: 'Harrower', type: 'warjack', bgPoints: 0, pointCost: 16, factions: ['cryx']},
  {name: 'Leviathan', type: 'warjack', bgPoints: 0, pointCost: 16, factions: ['cryx']},
    // units:
  {name: '6x_satyrix_bwitches', type: 'unit', bgPoints: 0, pointCost: 8, factions: ['cryx']},
  {name: '10x_satyrix_bwitches', type: 'unit', bgPoints: 0, pointCost: 13, factions: ['cryx']},
  {name: '10x_satyrix_bw+commander', type: 'unit', bgPoints: 0, pointCost: 17, factions: ['cryx']},
  {name: '6x_bane_warriors', type: 'unit', bgPoints: 0, pointCost: 10, factions: ['cryx']},
  {name: '10x_bane_warriors', type: 'unit', bgPoints: 0, pointCost: 17, factions: ['cryx']},
    // solos:
  {name: 'Skarlock_thrall', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['cryx']},
  {name: 'Tartarus', type: 'solo', bgPoints: 0, pointCost: 6, factions: ['cryx']},
  {name: 'Pistol_wraith', type: 'solo', bgPoints: 0, pointCost: 5, factions: ['cryx']},
  {name: 'Necrotech', type: 'solo', bgPoints: 0, pointCost: 2, factions: ['cryx']},
  /* or Crucible Guard, Cryx, Cygnar, Khador, or Protectorate. */
  // Mercenaries and Minion
  
  {name: '6x_steelh_rifleman', type: 'unit', bgPoints: 0, pointCost: 8, factions: ['crucible', 'cryx', 'cygnar', 'khador', 'protectorate']},
  {name: '10x_steelh_rifleman', type: 'unit', bgPoints: 0, pointCost: 13, factions: ['crucible', 'cryx', 'cygnar', 'khador', 'protectorate']},
  {name: 'Alten_Ashley', type: 'solo', bgPoints: 0, pointCost: 6, factions: ['crucible', 'circle', 'cygnar', 'khador', 'protectorate', 'trollbloods']},
  {name: '6x_Cylena_and_hunters', type: 'unit', bgPoints: 0, pointCost: 12, factions: ['circle', 'cryx', 'cygnar', 'khador', 'retribution', 'trollbloods']},
  {name: '10x_Cylena_and_hunters', type: 'unit', bgPoints: 0, pointCost: 19, factions: ['circle', 'cryx', 'cygnar', 'khador', 'retribution', 'trollbloods']},
  {name: 'Gudrun', type: 'solo', bgPoints: 0, pointCost: 5, factions: ['circle', 'cryx', 'cygnar', 'khador', 'legion', 'trollbloods', 'skorne']},
  {name: 'Rorsh_and_Brine', type: 'solo', bgPoints: 0, pointCost: 15, factions: ['circle', 'cryx', 'cygnar', 'khador', 'protectorate', 'trollbloods', 'skorne', 'legion']},
  {name: 'Reinholdt', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['cygnar', 'khador']},
  {name: 'Dahlia_and_Skarath', type: 'solo', bgPoints: 0, pointCost: 17, factions: ['circle', 'retribution', 'trollbloods']},
  {name: 'Eiryss1', type: 'solo', bgPoints: 0, pointCost: 7, factions: ['cygnar', 'khador', 'protectorate', 'retribution']},
  {name: 'WrongEye_and_Snapjaw', type: 'solo', bgPoints: 0, pointCost: 17, factions: ['circle', 'cryx', 'trollbloods', 'skorne', 'legion']},
  {name: '3xGatorman_posse', type: 'unit', bgPoints: 0, pointCost: 10, factions: ['circle', 'legion', 'skorne', 'trollbloods']},
  {name: '5xGatorman_posse', type: 'unit', bgPoints: 0, pointCost: 16, factions: ['circle', 'legion', 'skorne', 'trollbloods']},
  {name: 'Totem_hunter', type: 'solo', bgPoints: 0, pointCost: 6, factions: ['circle', 'legion', 'skorne', 'trollbloods']},
  {name: 'gobber_bellows_crew', type: 'solo', bgPoints: 0, pointCost: 2, factions: ['circle', 'legion', 'skorne', 'trollbloods']}

];