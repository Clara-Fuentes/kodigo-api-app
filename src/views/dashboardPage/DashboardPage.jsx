import { useEffect, useMemo, useState } from "react";
import "./dashboardPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Chip, Spinner } from "@heroui/react";
import { Users as UsersIcon, GraduationCap, Rocket, DollarSign, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { getDashboardStats, listUsersMini } from "../../api/dashboard.service";
import { listBootcampsMini, createBootcampDash } from "../../api/bootcamps.service.mini";
import { createUser } from "../../api/users.service";

// NUEVO: modales separados
import CreateUserModal from "../../components/modals/CreateUserModal";
import CreateBootcampModal from "../../components/modals/CreateBootcampModal";

/* ---------- Sparkline ----------- */
function Sparkline({ data = [], height = 36 }) {
  const points = useMemo(() => {
    if (!data.length) return "";
    const max = Math.max(...data);
    const min = Math.min(...data);
    const norm = (v) => (max === min ? height / 2 : height - ((v - min) / (max - min)) * height);
    const step = 100 / (data.length - 1 || 1);
    return data.map((v, i) => `${i * step},${norm(v)}`).join(" ");
  }, [data, height]);

  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="db-spark">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StatCard({ title, value, delta, up, icon, spark = [] }) {
  const Icon = icon;
  return (
    <Card className="db-card">
      <CardHeader className="db-card-head">
        <div className="db-card-title">
          <div className="db-icon"><Icon size={18} /></div>
          <span>{title}</span>
        </div>
        <Chip size="sm" className="db-chip" variant="flat" startContent={up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}>
          {delta}
        </Chip>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="db-kpi">{value}</div>
        <div className="db-kpi-help">Últimos 7 días</div>
        <div className="mt-2"><Sparkline data={spark} /></div>
      </CardBody>
    </Card>
  );
}

/* ---------- Página ----------- */
export default function DashboardPage() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [stats, setStats] = useState({ users: 0, bootcamps: 0, active: 0, revenue: 0, trendUsers: [], trendRevenue: [] });
  const [users, setUsers] = useState([]);
  const [bootcamps, setBootcamps] = useState([]);

  // Estado modales + loading
  const [openUser, setOpenUser] = useState(false);
  const [openBootcamp, setOpenBootcamp] = useState(false);
  const [submittingUser, setSubmittingUser] = useState(false);
  const [submittingBootcamp, setSubmittingBootcamp] = useState(false);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true); setErr("");
        const [s, u, b] = await Promise.all([getDashboardStats(), listUsersMini(), listBootcampsMini(q)]);
        if (cancel) return;
        setStats(s); setUsers(u); setBootcamps(b);
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error cargando dashboard");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [q]);

  // Handlers submit
  const submitUser = async (payload) => {
    try {
      setSubmittingUser(true);
      await createUser(payload);
      setOpenUser(false);
      const u = await listUsersMini();
      setUsers(u);
      alert("Usuario creado ✔");
    } catch (e) {
      alert(e?.message || "Error creando usuario");
    } finally {
      setSubmittingUser(false);
    }
  };

  const submitBootcamp = async (payload) => {
    try {
      setSubmittingBootcamp(true);
      await createBootcampDash(payload); // requiere token en localStorage
      setOpenBootcamp(false);
      const b = await listBootcampsMini(q);
      setBootcamps(b);
      alert("Bootcamp creado ✔");
    } catch (e) {
      alert(e?.message || "Error creando bootcamp");
    } finally {
      setSubmittingBootcamp(false);
    }
  };

  return (
    <div className="db-wrap db-root">
      {/* Header */}
      <div className="db-header">
        <div>
          <h1 className="db-title">Dashboard</h1>
          <p className="db-subtitle">Gestiona usuarios, bootcamps y actividad reciente.</p>
        </div>

        <div className="db-actions">
          <input className="db-input" placeholder="Buscar bootcamps…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="db-btn" onClick={() => setOpenUser(true)}><Plus size={16} /><span>Nuevo usuario</span></button>
          <button className="db-btn" onClick={() => setOpenBootcamp(true)}><Plus size={16} /><span>Nuevo bootcamp</span></button>
        </div>
      </div>

      {/* Error */}
      {err && (<div className="mt-4"><Chip color="danger" variant="flat">{err}</Chip></div>)}

      {/* KPIs */}
      <div className="db-kpis">
        <StatCard title="Usuarios" value={stats.users} delta="+4.1%" up icon={UsersIcon} spark={stats.trendUsers} />
        <StatCard title="Bootcamps" value={stats.bootcamps} delta="+2 nuevos" up icon={GraduationCap} spark={[2,3,4,4,5,6,7]} />
        <StatCard title="Activos ahora" value={stats.active} delta="-1.2%" up={false} icon={Rocket} spark={[8,7,6,7,5,4,5]} />
        <StatCard title="Ingresos (mes)" value={`$ ${Intl.NumberFormat().format(stats.revenue)}`} delta="+$320" up icon={DollarSign} spark={stats.trendRevenue} />
      </div>

      {/* 2 columnas */}
      <div className="db-cols">
        {/* Users */}
        <div className="db-panel">
          <div className="db-panel-head">
            <div>
              <div className="db-panel-title">Usuarios recientes</div>
              <div className="db-panel-sub">Top 8 por actividad</div>
            </div>
            <Link to="/users" className="db-btn db-btn-link">Ver todos</Link>
          </div>

          {loading ? (
            <div className="db-empty"><Spinner label="Cargando usuarios…" /></div>
          ) : users.length ? (
            <ul className="db-users">
              {users.map((u) => (
                <li key={u.id} className="db-user">
                  <div className="db-user-info">
                    <div className="db-avatar">{u.name?.[0]?.toUpperCase() || "U"}</div>
                    <div className="min-w-0">
                      <div className="db-user-name truncate">{u.name}</div>
                      <div className="db-user-email truncate">{u.email}</div>
                    </div>
                  </div>
                  <button className="db-btn db-btn-ghost" onClick={() => nav(`/users/${u.id}`)} title="Ir al perfil">
                    <ArrowUpRight size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="db-empty">No hay usuarios para mostrar.</div>
          )}
        </div>

        {/* Bootcamps */}
        <div className="db-panel">
          <div className="db-panel-head">
            <div>
              <div className="db-panel-title">Bootcamps</div>
              <div className="db-panel-sub">Resultados {q ? `para “${q}”` : "recientes"}</div>
            </div>
            <Link to="/bootcamps" className="db-btn db-btn-link">Ver catálogo</Link>
          </div>

          {loading ? (
            <div className="db-empty"><Spinner label="Cargando bootcamps…" /></div>
          ) : (
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr><th>Título</th><th>Categoría</th><th>Semanas</th><th>Precio</th><th></th></tr>
                </thead>
                <tbody>
                  {bootcamps.length ? bootcamps.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div className="font-medium">{b.title}</div>
                        <div className="db-user-email">{b.description}</div>
                      </td>
                      <td>{b.category}</td>
                      <td>{b.weeks}</td>
                      <td>{b.price ? `$ ${Intl.NumberFormat().format(b.price)}` : "—"}</td>
                      <td>
                        <div className="flex-end">
                          <button className="db-btn db-btn-link" onClick={() => nav(`/bootcamps/${b.id}`)}>
                            Detalles
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="db-empty">No encontramos bootcamps {q ? "para tu búsqueda" : ""}.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modales (montados al body, sin solape) */}
      <CreateUserModal
        isOpen={openUser}
        onOpenChange={setOpenUser}
        onSubmit={submitUser}
        loading={submittingUser}
      />
      <CreateBootcampModal
        isOpen={openBootcamp}
        onOpenChange={setOpenBootcamp}
        onSubmit={submitBootcamp}
        loading={submittingBootcamp}
      />
    </div>
  );
}
