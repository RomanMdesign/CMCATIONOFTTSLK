export const PERMS = {
  VIEW_CHANNELS: 1n << 0n,
  SEND_MESSAGES: 1n << 1n,
  MANAGE_MESSAGES: 1n << 2n,
  CONNECT: 1n << 3n,
  SPEAK: 1n << 4n,
  MUTE_MEMBERS: 1n << 5n,
  DEAFEN_MEMBERS: 1n << 6n,
  MOVE_MEMBERS: 1n << 7n,
  MANAGE_CHANNELS: 1n << 8n,
  MANAGE_ROLES: 1n << 9n,
  KICK_MEMBERS: 1n << 10n,
  BAN_MEMBERS: 1n << 11n,
  MANAGE_COMMUNITY: 1n << 12n,
  ADMINISTRATOR: 1n << 13n,
  MENTION_EVERYONE: 1n << 14n,
  ATTACH_FILES: 1n << 15n,
  ADD_REACTIONS: 1n << 16n,
  USE_AI: 1n << 17n,
  USE_MUSIC: 1n << 18n,
};

export function hasPermission(memberPerms, required) {
  if (!memberPerms) return false;
  const p = BigInt(memberPerms);
  if (p & PERMS.ADMINISTRATOR) return true;
  return (p & required) === required;
}

export async function getMemberPermissions(prisma, userId, communityId) {
  const member = await prisma.member.findUnique({
    where: { userId_communityId: { userId, communityId } },
    include: { role: true, community: true },
  });
  if (!member) return 0n;
  if (member.community.ownerId === userId) {
    return PERMS.ADMINISTRATOR | (1n << 62n);
  }
  return member.role ? BigInt(member.role.permissions) : 0n;
}
