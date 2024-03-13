module.exports = {
  name: 'presenceUpdate',
  once: false,
  async execute(client, oldPresence, newPresence) {
    const fetchGuild = await client.getGuild(newPresence.guild);
    const roleID = fetchGuild.soutient; // Remplacez par l'ID du rôle que vous souhaitez attribuer
    const inviteLink = fetchGuild.linkSoutient;
    const member = newPresence.member;
    if (!member) return;
    if (member) {
      const customStatusActivity = newPresence.activities.find(
        (activity) => activity.type === 'CUSTOM'
      )

      if (customStatusActivity && customStatusActivity.state.includes(inviteLink)) {
        const role = member.guild.roles.cache.get(roleID);
        if (!member.roles.cache.has(roleID)) {
          try {
            await member.roles.add(role);
            console.log(`Rôle ajouté au membre ${member.user.tag}.`);
          } catch (error) {
            console.error(`Une erreur s'est produite lors de l'ajout du rôle au membre : ${error}`);
          }
        }
      } else {
        const role = member.guild.roles.cache.get(roleID);
        if (member.roles.cache.has(roleID)) {
          try {
            await member.roles.remove(role);
            console.log(`Rôle supprimé du membre ${member.user.tag}.`);
          } catch (error) {
            console.error(`Une erreur s'est produite lors de la suppression du rôle du membre : ${error}`);
          }
        }
      }
    } 
  },
};
