import { http } from "./http";

/** KPIs (igual que antes) */
export async function getDashboardStats() {
  try {
    const d = await http("/dashboard/summary");
    return {
      users: Number(d.users ?? 0),
      bootcamps: Number(d.bootcamps ?? 0),
      active: Number(d.active ?? 0),
      revenue: Number(d.revenue ?? 0),
      trendUsers: Array.isArray(d.trendUsers) ? d.trendUsers : [2,3,5,6,7,9,12],
      trendRevenue: Array.isArray(d.trendRevenue) ? d.trendRevenue : [120,140,180,160,200,240,260],
    };
  } catch {
    return {
      users: 0, bootcamps: 0, active: 0, revenue: 0,
      trendUsers: [2,3,3,4,5,6,7],
      trendRevenue: [100,120,110,140,160,180,190],
    };
  }
}

/** 🔧 ahora usa /users/public y limita a 8 */
export async function listUsersMini() {
  try {
    const res = await http(`/users/public?limit=8`);
    const arr = Array.isArray(res?.data) ? res.data : res;
    return (arr || []).slice(0, 8).map((u, i) => ({
      id: u.id ?? i + 1,
      name: u.name ?? u.email?.split("@")[0] ?? "User",
      email: u.email ?? "—",
      role: u.role ?? "User",
      isActive: u.isActive ?? true,
      createdAt: u.createdAt ?? null,
    }));
  } catch {
    return [];
  }
}
