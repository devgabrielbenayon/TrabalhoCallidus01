import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Página Admin para gerenciar pizzas e visualizar histórico de pedidos
// Pressupostos:
// - Backend (json-server) expõe endpoints: GET/POST/PUT/DELETE /pizzas e GET /orders
// - AuthContext fornece { user, token } e user.role === 'admin' para acesso
// - Rotas/proteção ficam em AppRoutes/ProtectedRoute

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [pizzas, setPizzas] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // form state (usamos um formulário controlado simples)
  const initialForm = {
    id: null,
    name: "",
    ingredients: "",
    priceSmall: "",
    priceMedium: "",
    priceLarge: "",
    image: "",
  };

  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") return; // não faz fetch se não for admin
    loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [pRes, oRes] = await Promise.all([
        fetch(`${API_BASE}/pizzas`).then((r) => r.json()),
        fetch(`${API_BASE}/orders`).then((r) => r.json()),
      ]);
      setPizzas(pRes);
      setOrders(oRes || []);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados. Verifique o servidor.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Nome é obrigatório";
    if (!form.ingredients.trim()) return "Informe ao menos um ingrediente";
    // preços obrigatórios e numéricos
    const pSmall = parseFloat(form.priceSmall);
    const pMed = parseFloat(form.priceMedium);
    const pLarge = parseFloat(form.priceLarge);
    if (Number.isNaN(pSmall) || pSmall <= 0) return "Preço (Pequena) inválido";
    if (Number.isNaN(pMed) || pMed <= 0) return "Preço (Média) inválido";
    if (Number.isNaN(pLarge) || pLarge <= 0) return "Preço (Grande) inválido";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validateForm();
    if (v) {
      setError(v);
      return;
    }

    const payload = {
      name: form.name.trim(),
      ingredients: form.ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      prices: {
        small: parseFloat(form.priceSmall),
        medium: parseFloat(form.priceMedium),
        large: parseFloat(form.priceLarge),
      },
      image: form.image.trim() || undefined,
    };

    try {
      setLoading(true);
      setError(null);
      if (isEditing && form.id != null) {
        const res = await fetch(`${API_BASE}/pizzas/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Falha ao atualizar pizza");
      } else {
        const res = await fetch(`${API_BASE}/pizzas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Falha ao cadastrar pizza");
      }
      setForm(initialForm);
      setIsEditing(false);
      await loadData();
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao salvar pizza");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(pizza) {
    setIsEditing(true);
    setForm({
      id: pizza.id,
      name: pizza.name || "",
      ingredients: (pizza.ingredients || []).join(", "),
      priceSmall: pizza.prices?.small ?? "",
      priceMedium: pizza.prices?.medium ?? "",
      priceLarge: pizza.prices?.large ?? "",
      image: pizza.image || "",
    });
  }

  async function handleDelete(id) {
    const ok = window.confirm("Excluir pizza? Esta ação não pode ser desfeita.");
    if (!ok) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/pizzas/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
      await loadData();
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao excluir");
    } finally {
      setLoading(false);
    }
  }

  // visualização simples do histórico (orders)
  function renderOrders() {
    if (!orders.length) return <p>Sem pedidos no histórico.</p>;
    return (
      <div className="orders-list">
        {orders
          .slice()
          .reverse()
          .map((o) => (
            <div key={o.id} className="order-card" style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Pedido #{o.id}</strong>
                <span>{o.status}</span>
              </div>
              <div>Destino: {o.type === "delivery" ? o.address : `Mesa ${o.table || '-'} `}</div>
              <div>Items:</div>
              <ul>
                {(o.items || []).map((it, i) => (
                  <li key={i}>{it.name} x {it.quantity} ({it.size})</li>
                ))}
              </ul>
              <div>Total: R$ {Number(o.total).toFixed(2)}</div>
            </div>
          ))}
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <div>Área restrita: você precisa ser administrador.</div>;
  }

  return (
    <div className="admin-page" style={{ maxWidth: 1000, margin: "0 auto", padding: 16 }}>
      <h2>Administração - Cardápio & Pedidos</h2>

      <section style={{ marginBottom: 24 }}>
        <h3>{isEditing ? "Editar Pizza" : "Cadastrar Nova Pizza"}</h3>
        {error && <div style={{ color: "#8b0000", marginBottom: 8 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
          <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
          <input name="ingredients" placeholder="Ingredientes (separados por vírgula)" value={form.ingredients} onChange={handleChange} />
          <div style={{ display: "flex", gap: 8 }}>
            <input name="priceSmall" placeholder="Preço Pequena" value={form.priceSmall} onChange={handleChange} />
            <input name="priceMedium" placeholder="Preço Média" value={form.priceMedium} onChange={handleChange} />
            <input name="priceLarge" placeholder="Preço Grande" value={form.priceLarge} onChange={handleChange} />
          </div>
          <input name="image" placeholder="URL da imagem (opcional)" value={form.image} onChange={handleChange} />
          <div>
            <button type="submit" disabled={loading}>{isEditing ? "Salvar alterações" : "Cadastrar pizza"}</button>
            {isEditing && (
              <button type="button" onClick={() => { setForm(initialForm); setIsEditing(false); }} style={{ marginLeft: 8 }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>Cardápio</h3>
        {loading ? (
          <p>Carregando pizzas...</p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {pizzas.length === 0 && <p>Sem pizzas cadastradas.</p>}
            {pizzas.map((p) => (
              <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #eee", padding: 8 }}>
                <img src={p.image || "https://via.placeholder.com/80x60?text=Pizza"} alt={p.name} style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: 13 }}>{(p.ingredients || []).join(", ")}</div>
                  <div style={{ fontSize: 13 }}>P: R$ {p.prices?.small?.toFixed(2)} • M: R$ {p.prices?.medium?.toFixed(2)} • G: R$ {p.prices?.large?.toFixed(2)}</div>
                </div>
                <div>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 8 }}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3>Histórico de Pedidos</h3>
        {renderOrders()}
      </section>
    </div>
  );
}
