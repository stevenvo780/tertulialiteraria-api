import { REST, Routes } from 'discord.js';

export async function registerDiscordCommands() {
  const commands = [
    {
      name: 'crear-nota',
      description: 'Crea una nota pública en la librería',
      options: [
        {
          name: 'titulo',
          type: 3, // STRING
          description: 'El título de la nota',
          required: true,
        },
        {
          name: 'contenido',
          type: 3, // STRING
          description: 'El contenido de la nota',
          required: true,
        },
      ],
    },
  ];

  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_BOT_TOKEN,
  );

  try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}
